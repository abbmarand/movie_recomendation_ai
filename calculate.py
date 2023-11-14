import requests
from transformers import AutoTokenizer, AutoModel
import torch
import torch.nn.functional as F
themoviedbkey = "84f3c7d3535844352187af60533b5e46"
tokenizer = AutoTokenizer.from_pretrained('sentence-transformers/all-MiniLM-L6-v2')
model = AutoModel.from_pretrained('sentence-transformers/all-MiniLM-L6-v2')
def mean_pooling(model_output, attention_mask):
    token_embeddings = model_output[0] #First element of model_output contains all token embeddings
    input_mask_expanded = attention_mask.unsqueeze(-1).expand(token_embeddings.size()).float()
    return torch.sum(token_embeddings * input_mask_expanded, 1) / torch.clamp(input_mask_expanded.sum(1), min=1e-9)

def main(len):
    for i in range(1, len + 1):
        print(f"{i}/{len}")
        moviearr = get_movie_list(i)
        tvarr = get_tv_list(i)
        for movie in moviearr:
            process_movie(movie)
        for tv in tvarr:
            process_tv(tv)

def calculatevec(sentence, name):
    encoded_input = tokenizer(sentence, padding=True, truncation=True, return_tensors='pt')
    print(f"calculating for {name}")
    # Compute token embeddings
    with torch.no_grad():
        model_output = model(**encoded_input)

    # Perform pooling
    sentence_embeddings = mean_pooling(model_output, encoded_input['attention_mask'])

    # Normalize embeddings
    sentence_embeddings = F.normalize(sentence_embeddings, p=2, dim=1)
    

def get_movie_list(page):
    response = requests.get(f"https://api.themoviedb.org/3/discover/movie?api_key={themoviedbkey}&page={page}")
    data = response.json()
    return data["results"]


def get_tv_list(page):
    response = requests.get(f"https://api.themoviedb.org/3/discover/tv?api_key={themoviedbkey}&page={page}")
    data = response.json()
    return data["results"]


def process_movie(movie):
    # Do something with each movie
    moviedata = [f"{movie['title']}: {movie['overview']}"]

    calculatevec(moviedata, f"{movie['title']}")


def process_tv(tv):
    # Do something with each TV show
    tvdata = [f"{tv['name']}: {tv['overview']}"]
    calculatevec(tvdata, f"{tv['name']}")

if __name__ == "__main__":
    main(10)
