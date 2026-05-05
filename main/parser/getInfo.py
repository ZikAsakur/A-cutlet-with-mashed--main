import requests
from bs4 import BeautifulSoup


def get_ruks():
    url  = "https://fsp-russia.com/region/regions/"

    request = requests.get(url)


    html = request.text
    soup = BeautifulSoup(html, "html.parser")


    regions = soup.find_all("div", 'contact_td')


    data = []
    for i in regions:


        fio = i.find('div', 'cont ruk')
        if fio is None:
            continue


        fio = fio.find('p', 'white_region').text
        
        region  = i.find('div', 'cont sub')
        region = region.find('p', 'white_region').text
        
        email = i.find('div', 'cont con')
        email = email.find('p', 'white_region').text
        data.append([ region,fio, email])
    return data

