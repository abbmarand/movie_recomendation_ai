import requests
from transformers import AutoTokenizer, AutoModel
import torch
import torch.nn.functional as F
from flask import Flask,  request
app = Flask(__name__)
themoviedbkey = "84f3c7d3535844352187af60533b5e46"
tokenizer = AutoTokenizer.from_pretrained('sentence-transformers/all-MiniLM-L6-v2')
model = AutoModel.from_pretrained('sentence-transformers/all-MiniLM-L6-v2')
def mean_pooling(model_output, attention_mask):
    token_embeddings = model_output[0] #First element of model_output contains all token embeddings
    input_mask_expanded = attention_mask.unsqueeze(-1).expand(token_embeddings.size()).float()
    return torch.sum(token_embeddings * input_mask_expanded, 1) / torch.clamp(input_mask_expanded.sum(1), min=1e-9)

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
    return sentence_embeddings
    

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
    embed = calculatevec(moviedata, f"{movie['title']}")
    return embed.tolist()[0]



def process_tv(tv):
    # Do something with each TV show
    tvdata = [f"{tv['name']}: {tv['overview']}"]
    embed = calculatevec(tvdata, f"{tv['name']}")
    return embed.tolist()[0]


def getmovie(i):
    return_list = []
    moviearr = get_movie_list(i)
    for movie in moviearr:
        embed = process_movie(movie)
        movie['embedding'] = embed
        return_list.append(movie)
    return return_list

def gettv(i):
    return_list = []
    tvarr = get_tv_list(i)
    for tv in tvarr:
        embed = process_tv(tv)
        tv['embedding'] = embed
        return_list.append(tv)
    return return_list

            
@app.route('/gettv', methods=['POST'])
def tv_function():
    data = request.get_json()
    number = data.get('number')
    if number is not None:
        result = gettv(number)
        return {'result': result}
    else:
        return {'error': 'Number not provided'}

@app.route('/getmovie', methods=['POST'])
def movie_function():
    data = request.get_json()
    number = data.get('number')
    if number is not None:
        result = getmovie(number)
        return {'result': result}
    else:
        return {'error': 'Number not provided'}
    
@app.route('/gen', methods=['POST'])
def generate_function():
    print("/generate")
    data = request.get_json()
    print(data)
    desc = data.get('desc')
    print(desc)
    embedding = calculatevec(desc,'personal')
    embedding_list = embedding.tolist()
    return {'result': embedding_list}

@app.route('/')
def index():
    return "hello"
if __name__ == '__main__':
    app.run(port=5000)  # Run the Flask app on port 5000
