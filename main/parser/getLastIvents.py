import requests as req
from bs4 import BeautifulSoup
import time


def get_last_events():
    print(2)

    res = req.get("https://fsp-russia.com/calendar/archive/")
    print(res)
    while res.status_code == 503:
        res = req.get("https://fsp-russia.com/calendar/archive/")
        print(res)

    soup = BeautifulSoup(res.text, "html.parser")

    items = soup.find_all("div", class_="archive_item")

    data =[]
    print(items)
    for item in items:
        time.sleep(1)
        city_cont = item.find("div", class_="city")
        city = city_cont.find("p").text if city_cont and city_cont.find("p") else None
        mens_cont = item.find("div", class_="mens")
        mens = mens_cont.find("p").text if mens_cont and mens_cont.find("p") else None

        discipline_cont = item.find("div", class_="discipline")
        discipline = discipline_cont.find("p").text if discipline_cont and discipline_cont.find("p") else None


        title_cont = item.find("div", class_="title")
        title = title_cont.find("p").text if title_cont and title_cont.find("p") else None


        link = item.find("a")
        url = link.attrs["href"] if link and "href" in link.attrs else None

        if not url:
            continue 
        
        response = req.get("https://fsp-russia.com/" + url)
        print(response)
        
        s = BeautifulSoup(response.text, "html.parser")

        format_cont = s.find("div", class_="hybrid")
        format = format_cont.find("p").text if format_cont and format_cont.find("p") else None


        date_cont = s.find("div", class_="date")
        dates = (
            date_cont.find("p").text.split("-") if date_cont and date_cont.find("p") else None
        )

        print(city, mens, discipline, title, format, dates)

        data.append(
            {
                "city": city,
                "mens": mens,
                "discipline": discipline,
                "title": title,
                "format": format,
                "dates": dates,
            }
        )
    return data