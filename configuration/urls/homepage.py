from django.urls import path
from configuration.views.homepage import HomePageView

urlpatterns = [
    path(
        '',
        HomePageView.as_view(),
        name='home_page',
    ),
]
