from django.urls import path

from . import views

urlpatterns = [
    path('site/settings/', views.SiteSettingsView.as_view(), name='site-settings'),
    path('hero/', views.HeroSlideListView.as_view(), name='hero-list'),
    path('partners/', views.PartnerListView.as_view(), name='partner-list'),
    path('navigation/', views.NavigationListView.as_view(), name='nav-list'),
    path('contact/', views.ContactInfoView.as_view(), name='contact-info'),
    path('contact/subjects/', views.ContactSubjectListView.as_view(), name='contact-subjects'),
    path('contact/messages/', views.ContactMessageCreateView.as_view(), name='contact-create'),
]
