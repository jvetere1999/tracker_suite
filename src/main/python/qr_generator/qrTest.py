import datetime
import json

import pygame
import qrcode


class QRData:
    def __init__(self, starttime, deviceid, endtime):
        self.starttime = starttime
        self.deviceid = deviceid
        self.endtime = endtime


def to_json(obj):
    return json.dumps(obj, default=lambda obj: obj.__dict__)


def generateqrcode():
    starttime = datetime.datetime.now()
    twentysec = datetime.timedelta(seconds=20)
    endtime = (starttime + twentysec)
    start_time = str(starttime)
    end_time = str(endtime)

    qr1 = QRData(start_time, 0, end_time)

    qr = to_json(qr1)
    img = qrcode.make(qr)
    type(img)  # qrcode.image.pil.PilImage
    img.save("QRCode.png")


pygame.init()


gameDisplay = pygame.display.set_mode((0, 0), pygame.FULLSCREEN)
pygame.display.set_caption('QR Display')

black = (0, 0, 0)
white = (255, 255, 255)

clock = pygame.time.Clock()
crashed = False 

generateqrcode()

twentysec = datetime.timedelta(seconds=20)
endtime = (datetime.datetime.now() + twentysec)


while not crashed:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            crashed = True
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_ESCAPE:
                crashed = True

    a = datetime.datetime.now()
    
    if endtime < a:
        generateqrcode()
        endtime = (a + twentysec)
    
    qrImg = pygame.image.load('QRCode.png')
    r = qrImg.get_rect()
    r.center = gameDisplay.get_rect().center
    gameDisplay.fill(white)
    gameDisplay.blit(qrImg, r)

    pygame.display.update()
    clock.tick(60)

pygame.quit()
quit()
