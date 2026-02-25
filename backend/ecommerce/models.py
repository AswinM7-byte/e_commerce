from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    mobile_number = models.CharField(max_length=15, blank=True)
    address = models.TextField(blank=True)

    def __str__(self):
        return self.user.username
    

class Product(models.Model):

    CATEGORY_CHOICES = [
        ('mobile', 'Mobile'),
        ('appliance', 'Home Appliance'),
        ('shirt', 'Shirt'),
        ('dress', 'Girls Dress'),
    ]

    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default="mobile")
    image = models.ImageField(upload_to="products/", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
#Cart model to store products added to the cart by users
class Cart(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, unique=True)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return self.product.name



class Order(models.Model):

    PAYMENT_CHOICES = [
        ('upi', 'UPI'),
        ('gpay', 'Google Pay'),
        ('paytm', 'Paytm'),
        ('cod', 'Cash On Delivery'),
    ]

    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    customer_name = models.CharField(max_length=200)
    mobile_number = models.CharField(max_length=15)
    address = models.TextField()

    payment_method = models.CharField(max_length=20, choices=PAYMENT_CHOICES)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.customer_name
