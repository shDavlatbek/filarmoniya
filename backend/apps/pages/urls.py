from django.urls import path

from . import views

urlpatterns = [
    path('about/', views.AboutPageView.as_view(), name='about-page'),
    path('statute/', views.StatuteView.as_view(), name='statute'),
    path('youth-politics/', views.YouthPoliticsView.as_view(), name='youth-politics'),
]
