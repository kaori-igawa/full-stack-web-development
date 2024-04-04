from django.urls import path
from . import views

urlpatterns = [
  # api/hello/backend/というリクエストがきたらapi/hello/views.pyのBackend Classを参照する
  path('backend/', views.Backend.as_view())
]