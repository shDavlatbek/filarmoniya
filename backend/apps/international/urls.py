from django.urls import path

from . import views

urlpatterns = [
    path('memorandums/', views.MemorandumListView.as_view(), name='memorandums-list'),
    path('international-concerts/', views.IntlConcertListView.as_view(), name='intl-concerts-list'),
    path('competitions/', views.CompetitionListView.as_view(), name='competitions-list'),
]
