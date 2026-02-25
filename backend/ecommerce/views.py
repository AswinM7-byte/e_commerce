from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product,Cart,Order
from .serializers import ProductSerializer,CartSerializer,OrderSerializer,RegisterSerializer, LoginSerializer
from django.contrib.auth import login
from django.views.decorators.csrf import csrf_exempt

@api_view(['GET'])
def product_list(request):
    employees = Product.objects.all()
    serializer = ProductSerializer(employees, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def product_detail(request, product_id):
    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)

    serializer = ProductSerializer(product)
    return Response(serializer.data)


@api_view(['GET', 'POST'])
def add_to_cart(request):
    if request.method == 'GET':
        cart = Cart.objects.all()
        serializer = CartSerializer(cart, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        product_id = request.data.get("product_id")

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"error": "Invalid product"}, status=400)

        cart_item, created = Cart.objects.get_or_create(product=product)

        if not created:
            cart_item.quantity += 1
            cart_item.save()

        serializer = CartSerializer(cart_item)
        return Response(serializer.data, status=201)
    

@api_view(['GET', 'POST'])
def create_order(request):

    if request.method == 'GET':
        orders = Order.objects.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)



@csrf_exempt
@api_view(['POST'])
def register_view(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User registered successfully"}, status=201)
    return Response(serializer.errors, status=400)


@csrf_exempt
@api_view(['POST'])
def login_view(request):
    serializer = LoginSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.validated_data
        login(request, user)
        return Response({"message": "Login successful"})

    return Response(serializer.errors, status=400)