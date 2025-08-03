import cv2 as cv
import numpy as np
import matplotlib.pyplot as plt

def change_color(img, hue):
    hsv_img = cv.cvtColor(img, cv.COLOR_BGR2HSV)
    for i in range(len(hsv_img)):
        for j in range(len(hsv_img[0])):
            hsv_img[i][j][0] = hue
    changed_image = cv.cvtColor(hsv_img, cv.COLOR_HSV2BGR)
    return changed_image
