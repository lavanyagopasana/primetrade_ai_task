# backend/schemas.py
from pydantic import BaseModel, EmailStr
from typing import Optional

# For user registration
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

# For user login
class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserProfile(BaseModel):
    username: str
    email: str
    full_name: str 

# For returning user info (response model)
class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr

    class Config:
        from_attributes = True  # Pydantic v2 (replaces orm_mode)

class EntityBase(BaseModel):
    title: str
    description: str | None = None

class EntityCreate(EntityBase):
    pass

class UserBase(BaseModel):
    username: str

    class Config:
        from_attributes = True

class EntityResponse(BaseModel):
    id: int
    name: str
    description: Optional[str]
    owner: Optional[UserBase]  # ✅ use User model instead of string

    class Config:
        from_attributes = True