from sklearn.feature_extraction.text import CountVectorizer
from nltk.corpus import stopwords
import numpy as np

# load data
f = open('pubdata.txt', 'r')
data = []
doc = f.read()
data.append(doc)
# print(data)

# tokenized
vectorizer = CountVectorizer(min_df=1)

count = vectorizer.fit_transform(data)
count = count.toarray()

token = vectorizer.get_feature_names()

# filtering
filtered_words = [word for word in token if word not in stopwords.words('english')]

fcount = []
for word in filtered_words:
  fcount.append(count[0, token.index(word)])

fcount = np.array(fcount)
fcount2 = fcount > 10
fcount = fcount[fcount > 10]

fwords = []
idx = 0
for i in fcount2:
  if i == True:
    fwords.append(filtered_words[idx])
  idx += 1
print(fwords, fcount)

# output
results = []
for i in range(fcount.shape[0]):
  results.append({"key": fwords[i], "value": fcount[i]})
print(results)
