# 1) Você é do tipo que gosta de maratonar animes e terminar na mesma semana? (episodes)
# 2) Quando escolhe assistir a um anime, você costuma levar em consideração as avaliações e críticas? (score)
# 3) Você gosta de animes nostálgicos? (year)
# 4) "Você tem preferência por animes que se destacam pelas cenas de ação intensas e empolgantes?" (acao) 
# 5) "Você se sente inclinado  a assistir a animes que exploram aventuras épicas e jornadas emocionantes?" (adventure)
# 6) "Você costuma buscar animes que receberam prêmios e reconhecimento por sua qualidade?"(Award Winning)
# 7) "Quando se trata de escolher um anime para assistir, você geralmente procura por aqueles que te fazem dar boas risadas?" (Comedia)
# 8) "Você costuma se envolver mais em animes que exploram temas dramáticos e emocionais?" (Drama)
# 9) "Você costuma se interessar por animes que exploram mundos imaginários e elementos sobrenaturais?" (Fantasy)
# 8) "Você gosta de animes que exploram sustos e suspense?" (horror)
# 9) "Você gosta de animes com investigações e mistérios?" (Mystery)
# 10) "Você gosta de boas histórias de amor?" (Romance)
# 11) "Você se interessa por animes que exploram conceitos futuristas e tecnologia avançada?" (Sci-fi)

# Index(['mal_id', 'episodes', 'airing', 'duration', 'rating', 'score',
#        'scored_by', 'rank', 'popularity', 'year', 'genres', 'Action',
#        'Adventure', 'Award Winning', 'Comedy', 'Drama', 'Fantasy', 'Horror',
#        'Mystery', 'Romance', 'Sci-Fi', 'Slice of Life', 'Sports',
#        'Supernatural', 'Suspense'],
#       dtype='object')

import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from fastapi import FastAPI, HTTPException, Body

def similarity(row1,row2,weights):
    similarity = 0
    for attribute, weight in weights.items():
        similarity += weight * cosine_similarity(np.array(row1[attribute]).reshape(1,-1), np.array(row2[attribute]).reshape(1,-1) )
    return similarity


def recommend(sample):
    df["similarity"] = df.apply(lambda row: similarity(row1=row, row2=sample), axis=1)
    df = df.sort_values(by=['similarity'],ascending=False)
    return df['mal_id'].iloc[:5].tolist()

def getSample(rules,weight,answerns):
    for rule in rules:
        cause, sympthons, val = rule.split(";")
        sympthons = sympthons.split(",")
        print(sympthons)

    sample = {
        "episodes": [100],
        "airing": [0],
        "duration": [2],
        "rating": [5],
        "score": [1],
        "year": [1],
        "Action": [1],
        "Adventure": [1],
        "Award Winning": [1],
        "Comedy": [1],
        "Drama": [0],
        "Fantasy": [1],
        "Horror": [0],
        "Mystery": [1],
        "Romance": [1],
        "Sci-Fi": [1],
        "Slice of Life": [0],
        "Sports": [1],
        "Supernatural": [0],
        "Suspense": [0]
    }  
    return sample
    

app = FastAPI() 
app.df = pd.read_csv("../Data Extraction/result.csv")
app.weights = {
    "episodes": 0,
    "airing": 0,
    "duration": 0,
    "rating": 0,
    "score": 0,
    "year": 0,
    "Action": 0,
    "Adventure": 0,
    "Award Winning": 0,
    "Comedy": 0,
    "Drama": 0,
    "Fantasy": 0,
    "Horror": 0,
    "Mystery": 0,
    "Romance": 0,
    "Sci-Fi": 0,
    "Slice of Life": 0,
    "Sports": 0,
    "Supernatural": 0,
    "Suspense": 0
}   

app.rules = open("./rules.txt").read().splitlines()


@app.get('/')
async def recommend(params: list = Body(...)):
    try:       
        sample = getSample(app.rules,app.weights,params)
        df = pd.read_csv("../Data Extraction/result.csv")
        df["similarity"] = df.apply(lambda row: similarity(row1=row, row2=sample,weights=app.weights), axis=1)
        df = df.sort_values(by=['similarity'],ascending=False)
        return df['mal_id'].iloc[:5].tolist()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))