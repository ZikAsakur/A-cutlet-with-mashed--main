from django.db import models
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

# Create your models here.


class organization(models.Model):
    region = models.CharField(max_length=150)
    fio = models.CharField(max_length=250, blank=True, null=True)
    email = models.CharField(max_length=250)
    admin = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.region
    
class code(models.Model):
    code = models.IntegerField()
    email = models.CharField(max_length=250)
    
    def __str__(self):
        return f"{self.code}"
    

    
class lastIvent(models.Model):
    city = models.CharField(max_length=250, blank=True, null=True)
    mens = models.CharField(max_length=250,blank=True, null=True)
    discipline = models.CharField(max_length=250,blank=True, null=True)
    title = models.CharField(max_length=250,blank=True, null=True)
    format = models.CharField(max_length=250,blank=True, null=True)
    date_start = models.CharField(max_length=250,blank=True, null=True)
    date_end = models.CharField(max_length=250,blank=True, null=True)
    
    def __str__(self):
        return self.title
    

class authorizedToken(Token):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def token(self):
        return self.key
    
    
class persona (models.Model):
    sexs=[('Мужчина','Мужчина'),('Женщина','Женщина')]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=250 , blank=True, null=True)
    id_user = models.CharField(max_length=250 , blank=True, null=True)
    fio = models.CharField(max_length=250   , blank=True, null=True)
    phone = models.IntegerField( blank=True, null=True)
    born_date = models.DateField( blank=True, null=True)
    sex = models.CharField(max_length=250 , choices=sexs , blank=True, null=True)
    country = models.CharField(max_length=250 , blank=True, null=True)
    region = models.CharField(max_length=250 , blank=True, null=True)
    city = models.CharField(max_length=250 , blank=True, null=True)
    
    def __str__(self):
        return f"{self.user.username}"    
    

class Event(models.Model):
    name = models.CharField(max_length=250)
    type = models.CharField(max_length=250)
    age_group = models.CharField(max_length=250)
    date_start = models.DateField()
    date_end = models.DateField()
    verify = models.BooleanField(default=False)
    ended = models.BooleanField(default=False)
    
class comment (models.Model):
    comment = models.CharField(max_length=250)
    persona = models.ForeignKey(persona, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    
class OrganizationsEvents(models.Model):
    events =models.ManyToManyField(Event)
    organization = models.ForeignKey(organization, on_delete=models.CASCADE)
    comments = models.ManyToManyField(comment)
    
class personaEvents(models.Model):
    events =models.ManyToManyField(Event)
    persona = models.ForeignKey(persona, on_delete=models.CASCADE)
    
    def __str__(self):
        return f'{self.persona.user.username}'
    
class report(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    winner = models.ForeignKey(persona, on_delete=models.CASCADE)
    bolls = models.IntegerField()
    problems = models.TextField()
    helpers = models.TextField()
    file = models.FileField(upload_to='files/', blank=True, null=True)
    
    def __str__(self):
        return f'{self.event.name}'
    