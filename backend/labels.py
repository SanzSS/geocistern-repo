import pandas as pd
import numpy as np

data = pd.read_csv('./Database.csv')
labels = []
digits = [str(i) for i in list(range(10))]
exceptions = {'[Not provided]':'Not provided', '[not provided]':'Not provided', '[SCAN UNCLEAR]':'Not provided', 
              'orta boy': 'M', 'Küçük boy':'S', 'büyük boy':'L'}

for i in range(data.shape[0]):
    observation = str(data['DIMENSIONS'].iloc[i])

    try:
        first_x = observation.index('x')
        length = observation[first_x+1:first_x+3]
        
        length = [char for char in observation[first_x+1:first_x+4] if char in digits]
        length = int(''.join(length))

        if length <= 15:
            labels.append('S')
        if 15 < length <=20:
            labels.append('M')
        if 20 < length <= 25:
            labels.append('L')
        if 25 < length <=35:
            labels.append('XL')
        if 35 < length <= 50:
            labels.append('XXL')
        if 50 < length:
            labels.append('Sumo') 
        
    
    except:
        if observation not in exceptions: labels.append('Not provided')
        else: labels.append(exceptions[observation])

data['LABEL'] = labels
data.to_csv('label_dataset.csv', index=False)
