import datetime
from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import math
import os
from openai import OpenAI
import requests
from dotenv import load_dotenv
from langchain.chat_models import ChatOpenAI
from langchain.schema import HumanMessage, SystemMessage
from pymongo import MongoClient
load_dotenv()

# Set OpenAI API Key
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")  # Replace with your OpenAI API Key

# Initialize LangChain with OpenAI GPT Model
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.7)

# MongoDB Connection
MONGO_URI = "mongodb+srv://aaf9407:r3BhQVoLzKmtQvC8@cluster0.pmxxs.mongodb.net/"
client = MongoClient(MONGO_URI)
db = client["car_nft_marketplace"]
cars_collection = db["cars"]
transactions_collection = db["transactions"]

app = FastAPI()

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the AI-Powered Car Sales Assistant API"}

class CarData(BaseModel):
    tokenid: str 
    brand: str  # matches form field 'brand'
    make: str   # matches form field 'make'
    year: int   # matches form field 'year'
    miles: float  # matches form field 'miles'
    price: float  # matches form field 'price'
    description: Optional[str] = None  # matches form field 'description'
    image_url: Optional[str] = None  # for the uploaded image URL
    mintHash: str
    txId: str
    owner: str
    creator: str
    
@app.post("/insert_car_record")
async def insert_car_record(user_data: CarData):
   """
   Inserts a car record into MongoDB.
   All data comes from request body including tokenid
   """
   try:
       # Format the data before inserting
       car_record = {
           "tokenid": user_data.id, # custom added
           "brand": user_data.brand,
           "make": user_data.make,
           "year": user_data.year,
           "miles": user_data.miles,
           "price": user_data.price,
           "description": user_data.description,
           "image_url": user_data.image_url,
           "created_at": datetime.utcnow(),  # Add timestamp
           "mintHash": user_data.mintHash,
           "txId": user_data.txId,
           "creator": user_data.creator,
           "owner": user_data.owner,
           "status": True  # Add status field
       }
       
       # Insert into MongoDB
       result = cars_collection.insert_one(car_record)
       
       return {
           "message": "Car record inserted successfully!",
           "car_id": str(result.inserted_id),
           "tokenid": user_data.tokenid
       }
       
   except Exception as e:
       raise HTTPException(status_code=500, detail=str(e))

@app.get("/car/{tokenid}")
def get_car_by_tokenid(tokenid: str):
    """
    Retrieves a car record from MongoDB using the tokenid.
    """
    car = cars_collection.find_one({"tokenid": tokenid})

    if not car:
        raise HTTPException(status_code=404, detail="Car not found")

    # Convert _id to string for JSON serialization
    car["_id"] = str(car["_id"])

    return car

@app.get("/cars")
async def get_all_cars(skip: int = 0):
    """
    Retrieves all car records from MongoDB with pagination.
    """
    cursor = cars_collection.find().skip(skip)
    cars = []
    
    # Convert cursor to list and handle ObjectId conversion
    for car in cursor:
        car["_id"] = str(car["_id"])
        cars.append(car)
    
    return {
        "cars": cars,
        "count": len(cars),
        "skip": skip
    }

# 🔹 GET Endpoint: Car Value Estimation with Full Data Sent to LLM
@app.get("/car_value/")
def calculate_car_value(
    car_type: str = Query(..., description="Select car type: new, preowned, or vintage"),
    initial_price: float = Query(..., description="Original purchase price of the car"),
    age: int = Query(..., description="Age of the car in years"),
    mileage: Optional[int] = Query(None, description="Current mileage"),
    max_mileage: Optional[int] = Query(150000, description="Expected max mileage"),
    wear_and_tear: Optional[float] = Query(0.5, description="Condition score (0=Excellent, 1=Poor)"),
    accident_history: Optional[float] = Query(0.1, description="Accident impact score (0=No Accidents, 1=Major Accidents)"),
    ownership_changes: Optional[float] = Query(0.1, description="Ownership changes impact (0=Single Owner, 1=Multiple Owners)"),
    rarity_score: Optional[float] = Query(None, description="Rarity score (0=Common, 1=Extremely Rare)"),
    condition_score: Optional[float] = Query(None, description="Condition score (0=Poor, 1=Mint)"),
    celebrity_factor: Optional[float] = Query(None, description="Celebrity ownership impact (0=None, 1=Major Celebrity)"),
    movie_featured: Optional[bool] = Query(None, description="Was the car featured in a movie?"),
    auction_sale_trend: Optional[float] = Query(None, description="Auction sale price trend per year"),
    demand_score: Optional[float] = Query(None, description="Market demand score (0=Low, 1=Very High)")
):
    # 🚗 Depreciation for New Cars
    if car_type.lower() == "new":
        first_year_depreciation = 0.18 if age >= 1 else 0
        additional_years_depreciation = max(0, age - 1) * 0.12
        mileage_impact = (mileage / max_mileage) * 0.7 if mileage and max_mileage > 0 else 0
        depreciation_factor = min(first_year_depreciation + additional_years_depreciation + mileage_impact, 1)
        estimated_value = initial_price * (1 - depreciation_factor)

    # 🚙 Depreciation for Pre-Owned Cars
    elif car_type.lower() == "preowned":
        age_factor = age / 15
        mileage_factor = (mileage / max_mileage) if mileage and max_mileage > 0 else 0
        depreciation_factor = (age_factor + mileage_factor + wear_and_tear + accident_history + ownership_changes) * 0.8
        depreciation_factor = min(depreciation_factor, 1)
        estimated_value = initial_price * (1 - depreciation_factor)

    # 🚗💎 Appreciation for Vintage Cars
    elif car_type.lower() == "vintage":
        age_factor = math.log(1 + max(age, 0)) / 5
        rarity_factor = rarity_score * 0.3 if rarity_score is not None else 0
        condition_factor = condition_score * 0.2 if condition_score is not None else 0
        celebrity_impact = celebrity_factor * 0.25 if celebrity_factor is not None else 0
        movie_impact = 0.2 if movie_featured else 0
        auction_trend_impact = auction_sale_trend * 0.1 if auction_sale_trend is not None else 0
        demand_impact = demand_score * 0.15 if demand_score is not None else 0
        appreciation_factor = min(age_factor + rarity_factor + condition_factor + celebrity_impact + movie_impact + auction_trend_impact + demand_impact, 3.0)
        estimated_value = initial_price * (1 + appreciation_factor)

    else:
        return {"error": "Invalid car type. Choose from 'new', 'preowned', or 'vintage'."}

    # Construct car data dictionary
    car_data = {
        "car_type": car_type,
        "initial_price": initial_price,
        "age": age,
        "mileage": mileage,
        "max_mileage": max_mileage,
        "wear_and_tear": wear_and_tear,
        "accident_history": accident_history,
        "ownership_changes": ownership_changes,
        "rarity_score": rarity_score,
        "condition_score": condition_score,
        "celebrity_factor": celebrity_factor,
        "movie_featured": movie_featured,
        "auction_sale_trend": auction_sale_trend,
        "demand_score": demand_score
    }

    # Generate AI feedback
    text_feedback = generate_text_feedback(car_data, estimated_value)

    return {
        "car_data": car_data,
        "estimated_value": round(estimated_value, 2),
        "text_feedback": text_feedback
    }

# 🚗 Request Model for GET Endpoints
class CarRequest(BaseModel):
    car_type: str
    initial_price: float
    age: int
    mileage: Optional[int] = None
    max_mileage: Optional[int] = 150000
    wear_and_tear: Optional[float] = 0.5
    accident_history: Optional[float] = 0.1
    ownership_changes: Optional[float] = 0.1
    rarity_score: Optional[float] = None
    condition_score: Optional[float] = None
    celebrity_factor: Optional[float] = None
    movie_featured: Optional[bool] = None
    auction_sale_trend: Optional[float] = None
    demand_score: Optional[float] = None

def generate_text_feedback(car_data: dict, estimated_value: float):
    # Ensure estimated_value is included
    car_data["estimated_value"] = estimated_value  

    system_prompt = """
    You are a car sales expert and investment advisor.
    Your goal is to analyze all car details and generate a **persuasive** and **engaging** message for potential buyers.
    Highlight the **best features**, reliability, and resale value.
    Create urgency by mentioning market demand and investment potential.
    Use compelling language to encourage buyers to take action.
    """

    user_prompt = f"""
    Here are the car details:
    {car_data}

    Based on this information, write a compelling sales pitch that will help a prospective buyer make a confident purchase decision. Your response should be restricted to three sentences.
    """

    response = llm([
        SystemMessage(content=system_prompt),
        HumanMessage(content=user_prompt)
    ])

    return response.content

# 🔹 POST Endpoint: New Car Depreciation
@app.post("/new_car_depreciation/")
def calculate_new_car_depreciation(data: CarRequest):
    first_year_depreciation = 0.18 if data.age >= 1 else 0
    additional_years_depreciation = max(0, data.age - 1) * 0.12
    mileage_impact = (data.mileage / data.max_mileage) * 0.7 if data.mileage and data.max_mileage > 0 else 0
    depreciation_factor = min(first_year_depreciation + additional_years_depreciation + mileage_impact, 1)
    estimated_value = data.initial_price * (1 - depreciation_factor)

    # Ensure data is a dictionary before passing to LLM
    car_data_dict = data.model_dump()
    print("DEBUG: Car Data Dictionary:", car_data_dict)  # Debugging step

    text_feedback = generate_text_feedback(car_data_dict, estimated_value)

    return {
        "car_data": car_data_dict,
        "depreciated_value": round(estimated_value, 2),
        "text_feedback": text_feedback
    }

# 🔹 POST Endpoint: Pre-Owned Car Depreciation
@app.post("/preowned_car_depreciation/")
def calculate_preowned_car_depreciation(data: CarRequest):
    age_factor = data.age / 15
    mileage_factor = (data.mileage / data.max_mileage) if data.mileage and data.max_mileage > 0 else 0
    depreciation_factor = (age_factor + mileage_factor + data.wear_and_tear + data.accident_history + data.ownership_changes) * 0.8
    depreciation_factor = min(depreciation_factor, 1)
    estimated_value = data.initial_price * (1 - depreciation_factor)

    # Ensure data is a dictionary before passing to LLM
    car_data_dict = data.model_dump()
    print("DEBUG: Car Data Dictionary:", car_data_dict)  # Debugging step

    text_feedback = generate_text_feedback(data.model_dump(), estimated_value)

    return {
        "car_data": car_data_dict,
        "depreciated_value": round(estimated_value, 2),
        "text_feedback": text_feedback
    }


# 🔹 POST Endpoint: Vintage Car Appreciation
@app.post("/antique_car_value/")
def estimate_antique_car_value(data: CarRequest):
    age_factor = math.log(1 + max(data.age, 0)) / 5
    rarity_factor = data.rarity_score * 0.3 if data.rarity_score is not None else 0
    condition_factor = data.condition_score * 0.2 if data.condition_score is not None else 0
    celebrity_impact = data.celebrity_factor * 0.25 if data.celebrity_factor is not None else 0
    movie_impact = 0.2 if data.movie_featured else 0
    auction_trend_impact = data.auction_sale_trend * 0.1 if data.auction_sale_trend is not None else 0
    demand_impact = data.demand_score * 0.15 if data.demand_score is not None else 0
    appreciation_factor = min(age_factor + rarity_factor + condition_factor + celebrity_impact + movie_impact + auction_trend_impact + demand_impact, 3.0)
    estimated_value = data.initial_price * (1 + appreciation_factor)

    # Ensure data is a dictionary before passing to LLM
    car_data_dict = data.model_dump()
    print("DEBUG: Car Data Dictionary:", car_data_dict)  # Debugging step

    text_feedback = generate_text_feedback(data.model_dump(), estimated_value)

    return {
        "car_data": car_data_dict,
        "appreciated_value": round(estimated_value, 2),
        "text_feedback": text_feedback
    }

api_key = os.getenv("OPENAI_API_KEY")

client = OpenAI(api_key=api_key)

class ImageUrl(BaseModel):
    imageUrl: str


@app.post("/process_image")
async def process_image(image: ImageUrl):
    """
    1. Analyzes the image to generate a detailed description.
    2. Uses the description to create a pixel-style NFT image.
    """
    description = "No description available"  # Initialize description
    try:
        # Step 1: Analyze the image
        analysis_response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": "Describe this image extensively"},
                        {"type": "image_url", "image_url": {"url": image.imageUrl}}
                    ],
                }
            ],
            max_tokens=101
        )
        
        # Extract the description text
        description = analysis_response.choices[0].message.content

        # Step 2: Generate pixelated image based on description
        pixel_art_response = client.images.generate(
            model="dall-e-2",
            prompt=f"2d detailed pixel art of {description} , plain white background",
            n=1,
            size="256x256"
        )

        # pixel_art_url = pixel_art_response.data[0].url
        pixel_art_url = "https://i.ibb.co/G4cfPdFh/hellcat-png.png"
        # Upload the pixel art image to imgbb
        imgbb_api_key = os.getenv("IMGBB_API_KEY")
        if not imgbb_api_key:
            raise RuntimeError("IMGBB_API_KEY environment variable not set")

        imgbb_response = requests.post(
            "https://api.imgbb.com/1/upload",
            data={
                "key": imgbb_api_key,
                "image": pixel_art_url
            }
        )

        if imgbb_response.status_code != 200:
            pixel_art_url = "https://i.ibb.co/G4cfPdFh/hellcat-png.png"
            print("failed sad")

        imgbb_data = imgbb_response.json()
        hosted_image_url = imgbb_data["data"]["url"]

    except Exception as e:
        # Return a default URL in case of any error
        pixel_art_url = "https://i.ibb.co/G4cfPdFh/hellcat-png.png"
        hosted_image_url = "https://i.ibb.co/G4cfPdFh/hellcat-png.png"

    return {
        "description": description,
        "hostedImageUrl": hosted_image_url,
        "pixelArtUrl": pixel_art_url
    }

class ChatRequest(BaseModel):
    message: str

@app.post("/agent_chat/")
def agent_chat(chat: ChatRequest):
    """
    Receives a user's message and returns a persuasive and engaging response
    from the AI-powered car salesman agent.
    """
    # Generate the agent's reply using LangChain
    system_prompt = (
        "You are an assistant helping the user find their dream car. be very kind and helpful, and explain your reasoning for all your decisions. Do NOT use any markdown such as asteriks, new lines, bolding, etc. "
    )

    response = llm([
        SystemMessage(content=system_prompt),
        HumanMessage(content=chat.message)
    ])
    agent_reply = response.content

    return {"reply": agent_reply}

from datetime import datetime
from fastapi import HTTPException

@app.post("/add_rec")
async def addon_image():
    """
    Adds a predefined car record to MongoDB.
    """
    car_record = {
        "tokenid": "c183423b-5f9e-4c3b-b21a-7d62c4983f5a",
        "brand": "NYU",
        "make": "Campus Safety Car",
        "year": 2022,
        "miles": 15000,
        "price": 75,
        "description": "Tired of keeping the school safe..",
        "image_url": "https://i.ibb.co/G4cfPdFh/hellcat-png.png",
        "mintHash": "XG7MP9LJ5Q2T8B6DNCY1V43KWA",
        "txId": "D9LJ5QXG7MP2T8B6N4Y1V3CWAK",
        "owner": "B8T6D9LJ5QXG7MP2N4Y1V3CWAK",
        "creator": "T9LJ5QXG7MP2B8D6NWVY1A34KC",
        "status": False
    }

    try:
        # Insert into MongoDB
        result = cars_collection.insert_one(car_record)
        return {
            "message": "Car record inserted successfully!",
            "car_id": str(result.inserted_id),
            "tokenid": car_record["tokenid"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database insertion failed: {str(e)}")
