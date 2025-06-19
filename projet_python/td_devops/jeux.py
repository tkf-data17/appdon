import random

#Déclaration des variables

coup_enemi = 0
mon_coup = 0
ma_vie = 50
vie_enemi = 50
ma_vie1 = 0
nbr_potion = 3
potion = 0

#reation d'une boucle pour la continuité du jeu

while vie_enemi > 0 and ma_vie > 0:
        

    choix = input("Souhaitez-vous attaquer (1) ou prendre une potion(2) ? ")
    
    if choix.isdigit() == False or int(choix) > 2:

        print("Votre choix n'est pas valide...")
            
    elif choix.isdigit() == True and int(choix) == 1:
        mon_coup = random.randint(5,10)
        vie_enemi = vie_enemi - mon_coup
        coup_enemi = random.randint(5,15)
        ma_vie = ma_vie - coup_enemi
        print(f"vous avez infligé {mon_coup} points de dégat à l'ennemi")
        print(f"L'ennemi vous a infligé {coup_enemi} points de dégats")
        print(f"il vous reste {ma_vie} points de vie")
        print(f"Il reste à l'enemi {vie_enemi} points de vie")
        print("-" * 80)

    elif choix.isdigit() == True and int(choix) == 2 and nbr_potion > 0:
        potion = random.randint(15,50)
        print(f"Vous venez de recuperer {potion} points de vie ({nbr_potion - 1} restantes)")
        nbr_potion = nbr_potion - 1
        coup_enemi1 = random.randint(5,15)
        ma_vie1 = ma_vie + potion - coup_enemi1
        print(f"L'ennemi vous a infligé {coup_enemi1} de dégats")
        print(f"il vous reste {ma_vie1} vie")
        print(f"Il reste à l'enemi {vie_enemi} vie")
        print("-" * 80)
        print("Vous passez votre tour...")
        coup_enemi2 = random.randint(5,15)
        print(f"L'ennemi vous a infligé {coup_enemi2} points de dégats")
        ma_vie = ma_vie1 - coup_enemi2
        print(f"Il vous reste {ma_vie} point de vie")
        print(f"Il reste {vie_enemi} points de vie à l'ennemi.")
        print("-" * 80)
    
    elif choix.isdigit() == True and int(choix) == 2 and nbr_potion == 0:

        print("vous n'avez plus de potion...")
        print("-" * 80)

    vie_enemi = vie_enemi
else:
    if ma_vie > vie_enemi:
        print("Tu as gagné...")
        print("Fin du jeu")
    elif ma_vie < vie_enemi:
        print("Tu as perdu...")
        print("Fin du jeu")

print("bonjour tout le monde")