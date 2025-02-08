import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise RuntimeError("OPENAI_API_KEY environment variable not set")

client = OpenAI(api_key=api_key)

# Initialize FastAPI app
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ImageUrl(BaseModel):
    imageUrl: str

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/process_image")
async def process_image(image: ImageUrl):
    """
    1. Analyzes the image to generate a detailed description.
    2. Uses the description to create a pixel-style NFT image.
    """
    # Step 1: Analyze the image
    analysis_response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "Describe this image extensively"},
                    {"type": "image_url", "image_url": {"url": image.imageUrl}}
                ],
            }
        ],
        max_tokens=100
    )
    
    # Extract the description text
    description = analysis_response.choices[0].message.content

    # Step 2: Generate pixelated image based on description
    pixel_art_response = client.images.generate(
        model="dall-e-2",
        prompt=f"cartoony pixel art of {description}",
        n=1,
        size="512x512"
    )

    pixel_art_url = pixel_art_response.data[0].url
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
        raise HTTPException(status_code=500, detail="Failed to upload image to imgbb")

    imgbb_data = imgbb_response.json()
    hosted_image_url = imgbb_data["data"]["url"]

    return {
        "description": description,
        "hostedImageUrl": hosted_image_url,
        "pixelArtUrl": pixel_art_url
    }
