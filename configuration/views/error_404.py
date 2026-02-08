from django.conf import settings
from django.shortcuts import render

def not_found_error_view(request, exception=None):
    context = {
        "title": "Page Not Found",
        "description": (
            "Oops! The page you are looking for doesn't exist. "
            "It might have been moved or deleted."
        ),
        "button_text": "Go To Admin Dashboard",
        "button_link": settings.DOMAIN_NAME,
    }
    return render(request, "errors/404.html", context, status=404)
