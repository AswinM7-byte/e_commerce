from django.urls import path
from .views import login_view, product_list,product_detail,add_to_cart,create_order, register_view,login_view

urlpatterns = [
    path('product/', product_list),
    path("product/<int:product_id>/",product_detail),
    path('cart/', add_to_cart),
    path("order/", create_order),
    path("register/", register_view),
    path("login/", login_view)

]
