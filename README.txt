Hoofd functies
-functie 1: rapport-data voor één welbepaalde klas van bsvisitatie.schoolonline.be te halen en offline te bewaren
Systeemvereisten: Java Runtime environment geïnstalleerd. http://java.com/en/download/index.jsp

- functie 2: deze data offline leesbaar maken via standaard webbrowser 
Systeemvereisten: moderne webbrowser (getest op IE9,Firefox 17,Chrome)


Configuratie:
Gebruikersnaam en paswoord plaatsen in file lib/schoolOnlineBe.xml via eenvoudige teksteditor (bv MS notepad, beter NIET via MS Word)


Installatie:
1/ Java Runtime installeren  + JAVA_HOME omgeving variable plaatsen
2/ Programma folder kopiëren
3/ username / pwd plaatsen in lib/schoolOnlineBe.xml via eenvoudige teksteditor (bv MS notepad, beter NIET via MS Word)



Release notes

=========================================================================================
v1.1.5 (2015/03/24)
* bugfix: login werkte niet meer door wijzigingen aan login-pagina van schoolonline.be

Known issues:
* Letters met accenten (é,è,...) worden niet goed afgebeeld.

=========================================================================================
v1.1.4 (2014/10/05)
* bugfix: datum van toets werd niet meer opgehaald (vermoedelijk iets aangepast bij schoolonline.be)
* bugfix: niet bestaande leerlingen verschenen (vermoedelijk iets aangepast bij schoolonline.be)
* change: rapport toont nu genormaliseerd punten (meestal op 10), afgerond op 1 na de komma

Known issues:
* Letters met accenten (é,è,...) worden niet goed afgebeeld.


=========================================================================================
v1.1.3 (2014/06/03)
* bugfix: door aanpassing bij schoolonline.be werden Periodes/VLLK niet meer uitgelezen en was uiteindelijk rapport leeg

Known issues:
* Letters met accenten (é,è,...) worden niet goed afgebeeld.

=========================================================================================
v1.1.2 (2013/02/23)
* bugfix: afwezige leerlingen in een toets werden niet bewaard in json-data
* bugfix: punten zonder commentaar werden niet bewaard in json-data
* bugfix: punten voor/na herberekening van toetsen in actieve periode (=waarop nog kan gewijzigd worden) werden niet bewaard in json-data

Known issues:
* Letters met accenten (é,è,...) worden niet goed afgebeeld.
=========================================================================================
v1.1.1 (2013/02/11)
* verbeterde printbaarheid via CSS @media print

Known issues:
* Letters met accenten (é,è,...) worden niet goed afgebeeld.
=========================================================================================
v1.1.0 (2013/02/10)
* Rapport resultaten per leerling, vakselectie(s) mogelijk)
* Rijen in alternerende kleuren
* Bug in knop Toon/Verberg: simpelweg vervangen door "Schakel"

Known issues:
* Letters met accenten (é,è,...) worden niet goed afgebeeld.
=========================================================================================
v1.0.0 (2013/02/09)
* Rapport resultaten
* "Toon/Verberg commentaar" knop
* Punten onder de helf staan in het rood
* Commentaar beschikbaar via tooltip
* Navigatie door tabs via op/neer (of links/rechts) pijltjes

Known issues:
* Letters met accenten (é,è,...) worden niet goed afgebeeld.
=========================================================================================
