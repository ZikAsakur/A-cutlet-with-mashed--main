import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


def sendVerificated(email,code):
    sender = 'warface12452@mail.ru'
    password= 'oztYklshgIaxWcLC7Tof'
    try: 
        server = smtplib.SMTP(f"smtp.{sender.split('@')[1]}", 587)
        server.starttls()
        server.login(sender,password=password)
    except Exception as _ex:
        print( f'{_ex}\n Проверьте правильно ли указанны ваши данные')
    
    msg=MIMEMultipart('alternative')
    msg['Subject'] = 'Ваш код подтверждения'
    msg['From'] = sender
    msg['To'] = email
    massage=f"""<html><head></head><body><p style='font-size:20px;'>Ваш Код подтвержения : {code} <br><br></p></body></html>"""

        
    content= MIMEText(massage,'html')
    msg.attach(content)

    try: 
        print(123)
        server.sendmail(sender, email, msg.as_string())
        print(321)

    except Exception as _ex:
        return f'{_ex}\n Проверьте правильно ли указанны ваши данные'
    server.quit()