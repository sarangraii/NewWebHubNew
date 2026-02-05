# from pydantic_settings import BaseSettings
# from typing import List

# class Settings(BaseSettings):
#     # MongoDB
#     mongodb_url: str
#     database_name: str = "news_platform"
    
#     # News API
#     news_api_key: str
    
#     # AI API (optional - use one)
#     huggingface_api_key: str = ""
#     gemini_api_key: str = ""
    
#     # Firebase
#     firebase_credentials_path: str
    
#     # CORS
#     allowed_origins: str = "http://localhost:5173"
    
#     # Environment
#     environment: str = "development"
    
#     # Admin API Key
#     admin_api_key: str = ""
    
#     class Config:
#         env_file = ".env"
#         case_sensitive = False
    
#     def get_origins_list(self) -> List[str]:
#         return [origin.strip() for origin in self.allowed_origins.split(",")]

# settings = Settings()




from pydantic_settings import BaseSettings
from typing import List, Optional

class Settings(BaseSettings):
    # MongoDB
    mongodb_url: str
    database_name: str = "news_platform"
    
    # News API
    news_api_key: str
    
    # AI API (optional - use one)
    huggingface_api_key: str = ""
    gemini_api_key: str = ""
    
    # Firebase - BOTH OPTIONAL
    firebase_credentials_path: Optional[str] = None  # ✅ Made optional
    firebase_credentials_json: Optional[str] = None  # ✅ For Render
    
    # CORS
    allowed_origins: str = "http://localhost:5173"
    
    # Environment
    environment: str = "development"
    
    # Admin API Key
    admin_api_key: str = ""
    
    class Config:
        env_file = ".env"
        case_sensitive = False
        extra = "ignore"  # ✅ Ignore extra env vars
    
    def get_origins_list(self) -> List[str]:
        """Convert comma-separated origins string to list"""
        return [origin.strip() for origin in self.allowed_origins.split(",")]

settings = Settings()