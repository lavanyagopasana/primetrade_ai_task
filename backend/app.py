from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from backend import models, schemas, database
from backend.auth import router as auth_router, get_current_user

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="PrimeTrade Backend")

# ✅ Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Include auth routes
app.include_router(auth_router)


# --- Utility ---
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


# --- Routes ---
@app.get("/")
def root():
    return {"message": "Backend running successfully"}


@app.get("/user/profile", response_model=schemas.UserProfile)
def get_user_profile(current_user=Depends(get_current_user)):
    return {
        "email": current_user.email,
        "full_name": "PrimeTrade User",
        "username": current_user.username
    }


# --- ENTITIES CRUD ---

@app.get("/entities", response_model=List[schemas.EntityResponse])
def get_entities(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    entities = db.query(models.Entity).filter(
        models.Entity.owner_id == current_user.id
    ).all()
    return entities


@app.post("/entities", response_model=schemas.EntityResponse)
def create_entity(
    entity: schemas.EntityCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    db_entity = models.Entity(
        name=entity.title,  # ✅ match frontend 'title' field
        description=entity.description,
        owner_id=current_user.id
    )
    db.add(db_entity)
    db.commit()
    db.refresh(db_entity)
    return db_entity


@app.put("/entities/{entity_id}", response_model=schemas.EntityResponse)
def update_entity(
    entity_id: int,
    entity: schemas.EntityCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    db_entity = db.query(models.Entity).filter(
        models.Entity.id == entity_id,
        models.Entity.owner_id == current_user.id  # ✅ fixed
    ).first()

    if not db_entity:
        raise HTTPException(status_code=404, detail="Entity not found")

    db_entity.name = entity.title  # ✅ use model field 'name'
    db_entity.description = entity.description
    db.commit()
    db.refresh(db_entity)
    return db_entity


@app.delete("/entities/{entity_id}")
def delete_entity(
    entity_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    db_entity = db.query(models.Entity).filter(
        models.Entity.id == entity_id,
        models.Entity.owner_id == current_user.id  # ✅ fixed
    ).first()

    if not db_entity:
        raise HTTPException(status_code=404, detail="Entity not found")

    db.delete(db_entity)
    db.commit()
    return {"message": f"Entity {entity_id} deleted successfully"}
