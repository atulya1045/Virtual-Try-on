# System libs
import os
import csv
import torch
import numpy as np
import scipy.io
import PIL.Image
import torchvision.transforms
from mit_semseg.models import ModelBuilder, SegmentationModule
from mit_semseg.utils import colorEncode

colors = scipy.io.loadmat('./mit_semseg/data/color150.mat')['colors']
names = {}
with open('./mit_semseg/data/object150_info.csv') as f:
    reader = csv.reader(f)
    next(reader)
    for row in reader:
        names[int(row[0])] = row[5].split(";")[0]

# Network Builders
net_encoder = ModelBuilder.build_encoder(
    arch='resnet50dilated',
    fc_dim=2048,
    # weights='./mit_semseg/ckpt/ade20k-resnet50dilated-ppm_deepsup/encoder_epoch_20.pth')
    weights='./mit_semseg/ckpt/encoder_epoch_20.pth')
net_decoder = ModelBuilder.build_decoder(
    arch='ppm_deepsup',
    fc_dim=2048,
    num_class=150,
    # weights='./mit_semseg/ckpt/ade20k-resnet50dilated-ppm_deepsup/decoder_epoch_20.pth',
    weights='./mit_semseg/ckpt/decoder_epoch_20.pth',
    use_softmax=True)

crit = torch.nn.NLLLoss(ignore_index=-1)
segmentation_module = SegmentationModule(net_encoder, net_decoder, crit)

def get_mask(pil_image):
    # Load and normalize one image as a singleton tensor batch

    pil_to_tensor = torchvision.transforms.Compose([
        torchvision.transforms.ToTensor(),
        torchvision.transforms.Normalize(
            mean=[0.485, 0.456, 0.406], # These are RGB mean+std values
            std=[0.229, 0.224, 0.225])  # across a large photo dataset.
    ])

    img_original = np.array(pil_image)
    img_data = pil_to_tensor(pil_image)
    singleton_batch = {'img_data': img_data[None]}
    output_size = img_data.shape[1:]

    with torch.no_grad():
        scores = segmentation_module(singleton_batch, segSize=output_size)
    _, pred = torch.max(scores, dim=1)
    pred = pred.cpu()[0].numpy()
    predicted_classes = np.bincount(pred.flatten()).argsort()[::-1]

    def show_result(pred, index=None):
        pred = np.array(pred)
        if index is not None:
            pred = pred.copy()
            pred[pred != index] = -1
        return pred

    for c in predicted_classes:
        if(names[c+1] == "wall"):
            wall_img = show_result(img_original, pred, c)
        if(names[c+1] == "ceiling"):
            ceiling_img = show_result(img_original, pred, c)
    final_wall = np.zeros(((len(wall_img), len(wall_img[0]))))
    final_ceiling = np.zeros(((len(ceiling_img), len(ceiling_img[0]))))

    for i in range(len(wall_img)):
        for j in range(len(wall_img[0])):
            if wall_img[i][j] != -1:
                final_wall[i][j] = 1

    for i in range(len(ceiling_img)):
        for j in range(len(ceiling_img[0])):
            if ceiling_img[i][j] != -1:
                final_ceiling[i][j] = 1

    return final_wall, final_ceiling
