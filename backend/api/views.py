from django.shortcuts import render
from rest_framework.decorators import api_view
import json
from ibm_watson import VisualRecognitionV3
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import status
# Create your views here.

visual_recognition = VisualRecognitionV3(
    version='2019-08-31',
    iam_apikey='a8b1d1b3-3ef1-4113-b451-0baf556c320c')


@api_view(['POST', 'GET'])
def get_result(request):
    if request.method == 'POST':
        path = request.GET.get('src', None)
        result = {'data': path}
        print(result)
        return Response(data=result, status=status.HTTP_200_OK)
        # with (path, 'rb') as image_file:
        # classes = visual_recognition.classify(
        #     image_file,
        #     threshold='0.6',
        #     owners=["me"]).get_result()
        # tmp = json.dumps(classes, indent=2)
        # results = tmp.images.classifiers.classes
        # val = 0
        # for result in results:
        #     if result.score > val:
        #         val = result.score
        #         fin_val = result

        # return Response(data=fin_val, status=status.HTTP_200_OK)
