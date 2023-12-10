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
app = FastAPI()

weights = {
    "episodes": 1,
    "airing": 0,
    "duration": 1,
    "rating": 1,
    "score": 1,
    "year": 1,
    "Action": 1,
    "Adventure": 1,
    "Award Winning": 1,
    "Comedy": 1,
    "Drama": 1,
    "Fantasy": 0,
    "Horror": 1,
    "Mystery": 0,
    "Romance": 1,
    "Sci-Fi": 0,
    "Slice of Life": 0,
    "Sports": 1000,
    "Supernatural": 0,
    "Suspense": 0
}   

# sample = {
#     "episodes": [100],
#     "airing": [0],
#     "duration": [2],
#     "rating": [5],
#     "score": [1],
#     "year": [1],
#     "Action": [1],
#     "Adventure": [1],
#     "Award Winning": [1],
#     "Comedy": [1],
#     "Drama": [0],
#     "Fantasy": [1],
#     "Horror": [0],
#     "Mystery": [1],
#     "Romance": [1],
#     "Sci-Fi": [1],
#     "Slice of Life": [0],
#     "Sports": [1],
#     "Supernatural": [0],
#     "Suspense": [0]
# }   



def similarity(row1,row2):
    similarity = 0
    for attribute, weight in weights.items():
        similarity += weight * cosine_similarity(np.array(row1[attribute]).reshape(1,-1), np.array(row2[attribute]).reshape(1,-1) )
    return similarity


def recommend(sample):
    df["similarity"] = df.apply(lambda row: similarity(row1=row, row2=sample), axis=1)
    df = df.sort_values(by=['similarity'],ascending=False)
    return df['mal_id'].iloc[:5].tolist()


@app.get('/')
async def recommend(params: dict = Body(...)):
    try:
        df = pd.read_csv("../Data Extraction/result.csv")
        sample = {
            "episodes": [params.get('episodes', [0])],
            "airing": [params.get('airing', [0])],
            "duration": [params.get('duration', [0])],
            "rating": [params.get('rating', [0])],
            "score": [params.get('score', [0])],
            "year": [params.get('year', [0])],
            "Action": [params.get('Action', [0])],
            "Adventure": [params.get('Adventure', [0])],
            "Award Winning": [params.get('Award Winning', [0])],
            "Comedy": [params.get('Comedy', [0])],
            "Drama": [params.get('Drama', [0])],
            "Fantasy": [params.get('Fantasy', [0])],
            "Horror": [params.get('Horror', [0])],
            "Mystery": [params.get('Mystery', [0])],
            "Romance": [params.get('Romance', [0])],
            "Sci-Fi": [params.get('Sci-Fi', [0])],
            "Slice of Life": [params.get('Slice of Life', [0])],
            "Sports": [params.get('Sports', [0])],
            "Supernatural": [params.get('Supernatural', [0])],
            "Suspense": [params.get('Suspense', [0])]
        }   
        df["similarity"] = df.apply(lambda row: similarity(row1=row, row2=sample), axis=1)
        df = df.sort_values(by=['similarity'],ascending=False)
        return df['mal_id'].iloc[:5].tolist()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))