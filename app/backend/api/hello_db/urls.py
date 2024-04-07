from django.urls import path
from . import views

urlpatterns = [
  # api/hello_db/backend/というリクエストがきたらapi/hello_db/views.pyのDb Classを参照する
  path('backend/', views.Db.as_view())
]