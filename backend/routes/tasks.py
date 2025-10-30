from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database import get_db
from backend import models, schemas, utils

router = APIRouter(prefix="/tasks", tags=["Tasks"])

@router.post("/")
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db), current_user=Depends(utils.get_current_user)):
    new_task = models.Task(title=task.title, description=task.description, user_id=current_user.id)
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

@router.get("/")
def get_tasks(db: Session = Depends(get_db), current_user=Depends(utils.get_current_user)):
    return db.query(models.Task).filter(models.Task.user_id == current_user.id).all()

@router.put("/{task_id}")
def update_task(task_id: int, task: schemas.TaskCreate, db: Session = Depends(get_db), current_user=Depends(utils.get_current_user)):
    db_task = db.query(models.Task).filter(models.Task.id == task_id, models.Task.user_id == current_user.id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    db_task.title = task.title
    db_task.description = task.description
    db.commit()
    db.refresh(db_task)
    return db_task

@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db), current_user=Depends(utils.get_current_user)):
    db_task = db.query(models.Task).filter(models.Task.id == task_id, models.Task.user_id == current_user.id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(db_task)
    db.commit()
    return {"message": "Task deleted"}
