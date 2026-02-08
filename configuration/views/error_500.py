from django.conf import settings
from django.shortcuts import render

def internal_server_error_view(request):
    context = {
        "title": "Internal Server Error",
        "description": (
            "Sorry! Something went wrong on our end. "
            "Please try again later or contact support if the issue persists."
        ),
        "button_text": "Go To Admin Dashboard",
        "button_link": settings.DOMAIN_NAME,
    }
    return render(request, "errors/500.html", context, status=500)
