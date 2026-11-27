(function () {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const roundToFive = (value) => Math.max(5, Math.round(value / 5) * 5);

  const translations = {
    en: { language: "Language", flex: "Stick Flex", length: "Stick Length", skates: "Skate Sharpening", profiling: "Skate Profiling", recommended: "Your recommendation", home: "Hockey Tools" },
    sv: { language: "Språk", flex: "Klubbflex", length: "Klubblängd", skates: "Skridskoslipning", profiling: "Skridsko profilering", recommended: "Din rekommendation", home: "Hockeyverktyg" },
    fr: { language: "Langue", flex: "Flex de crosse", length: "Longueur de crosse", skates: "Affûtage des patins", profiling: "Profilage des patins", recommended: "Votre recommandation", home: "Outils de hockey" },
    de: { language: "Sprache", flex: "Schläger-Flex", length: "Schlägerlänge", skates: "Schlittschliff", profiling: "Schlittschuhprofilierung", recommended: "Ihre Empfehlung", home: "Hockey-Werkzeuge" },
    no: { language: "Språk", flex: "Kølleflex", length: "Køllelengde", skates: "Skøytesliping", profiling: "Skøyteprofilering", recommended: "Din anbefaling", home: "Hockeyverktøy" },
    da: { language: "Sprog", flex: "Stavflex", length: "Stavlængde", skates: "Skøjteslibning", profiling: "Skøjteprofilering", recommended: "Din anbefaling", home: "Hockeyværktøjer" },
    fi: { language: "Kieli", flex: "Mailan flex", length: "Mailan pituus", skates: "Luistinten teroitus", profiling: "Luistimen profilointi", recommended: "Suosituksesi", home: "Jääkiekko työkalut" }
  };
  const sharpeningBandLabels = {
    en: "Suggested test band (±1/8 in; not a confidence interval):",
    sv: "Föreslaget testintervall (±1/8 tum; inte ett konfidensintervall):",
    no: "Foreslått testområde (±1/8 tomme; ikke et konfidensintervall):",
    da: "Foreslået testinterval (±1/8 tomme; ikke et konfidensinterval):",
    fi: "Ehdotettu testialue (±1/8 tuumaa; ei luottamusväli):",
    de: "Vorgeschlagener Testbereich (±1/8 Zoll; kein Konfidenzintervall):",
    fr: "Plage d’essai suggérée (±1/8 pouce ; pas un intervalle de confiance) :"
  };

  const common = {
    sv: {
      "Hockey Tools": "Hockeyverktyg", "Language": "Språk", "Main navigation": "Huvudnavigation",
      "Stick Flex": "Klubbflex", "Stick Length": "Klubblängd", "Skate Sharpening": "Skridskoslipning", "Skate Profiling": "Skridsko profilering",
      "English": "Engelska", "Svenska": "Svenska", "Français": "Franska", "Deutsch": "Tyska",
      "Independent educational tools for hockey players worldwide.": "Oberoende utbildningsverktyg för hockeyspelare över hela världen.",
      "Player weight": "Spelarens vikt", "Player height": "Spelarens längd", "Height": "Längd",
      "Age group": "Åldersgrupp", "Skill level": "Färdighetsnivå", "Playing style": "Spelstil",
      "Playing position": "Position", "Skates on or off?": "Skridskor på eller av?",
      "Ice conditions": "Isförhållanden", "Preference": "Preferens", "Beginner": "Standard",
      "Adult recreational": "Motionsspelare", "Competitive": "Tävlingsspelare", "Elite": "Elitspelare",
      "Youth player": "Ungdomsspelare", "Youth (under 12)": "Ungdom (under 12)", "Junior (12–17)": "Junior (12–17)",
      "Senior (18+)": "Senior (18+)", "Forward": "Forward", "Defense": "Back", "Goalie / out player": "Målvakt / utespelare",
      "Quick release and snapshots": "Snabbt skott och direktskott", "Power shooter": "Kraftfull skytt",
      "Puck control and passing": "Puckkontroll och passningar", "Balanced all-around": "Balanserad spelstil",
      "Skates on": "Med skridskor", "Shoes / skates off": "Utan skor eller skridskor", "kg": "kg", "lb": "lb", "cm": "cm"
      ,"Final stick length (optional)": "Slutlig klubblängd (valfritt)"
      ,"Add the expected length after cutting to account for the change in effective stiffness.": "Lägg till den förväntade längden efter kapning för att ta hänsyn till ändringen i upplevd styvhet."
      ,"Check flex for this length →": "Kontrollera flexen för den här längden →"
    },
    fr: {
      "Hockey Tools": "Outils de hockey", "Language": "Langue", "Main navigation": "Navigation principale",
      "Stick Flex": "Flex de crosse", "Stick Length": "Longueur de crosse", "Skate Sharpening": "Affûtage des patins", "Skate Profiling": "Profilage des patins",
      "English": "Anglais", "Svenska": "Suédois", "Français": "Français", "Deutsch": "Allemand",
      "Independent educational tools for hockey players worldwide.": "Des outils éducatifs indépendants pour les hockeyeurs du monde entier.",
      "Player weight": "Poids du joueur", "Player height": "Taille du joueur", "Height": "Taille",
      "Age group": "Catégorie d’âge", "Skill level": "Niveau", "Playing style": "Style de jeu",
      "Playing position": "Position", "Skates on or off?": "Patins chaussés ou non ?",
      "Ice conditions": "Conditions de glace", "Preference": "Préférence", "Beginner": "Débutant",
      "Adult recreational": "Joueur loisir", "Competitive": "Joueur compétitif", "Elite": "Joueur élite",
      "Youth player": "Joueur junior", "Youth (under 12)": "Jeunes (moins de 12 ans)", "Junior (12–17)": "Junior (12–17 ans)",
      "Senior (18+)": "Senior (18 ans et plus)", "Forward": "Attaquant", "Defense": "Défenseur", "Goalie / out player": "Gardien / joueur de champ",
      "Quick release and snapshots": "Tir rapide et instantané", "Power shooter": "Tireur puissant",
      "Puck control and passing": "Contrôle et passes", "Balanced all-around": "Style équilibré",
      "Skates on": "Avec les patins", "Shoes / skates off": "Sans chaussures ni patins", "kg": "kg", "lb": "lb", "cm": "cm"
      ,"Final stick length (optional)": "Longueur finale de la crosse (facultatif)"
      ,"Add the expected length after cutting to account for the change in effective stiffness.": "Ajoutez la longueur prévue après coupe pour tenir compte du changement de rigidité ressentie."
      ,"Check flex for this length →": "Vérifier le flex pour cette longueur →"
    },
    de: {
      "Hockey Tools": "Hockey-Werkzeuge", "Language": "Sprache", "Main navigation": "Hauptnavigation",
      "Stick Flex": "Schläger-Flex", "Stick Length": "Schlägerlänge", "Skate Sharpening": "Schlittschliff", "Skate Profiling": "Schlittschuhprofilierung",
      "English": "Englisch", "Svenska": "Schwedisch", "Français": "Französisch", "Deutsch": "Deutsch",
      "Independent educational tools for hockey players worldwide.": "Unabhängige Bildungswerkzeuge für Hockeyspieler weltweit.",
      "Player weight": "Spielergewicht", "Player height": "Spielergröße", "Height": "Größe",
      "Age group": "Altersgruppe", "Skill level": "Spielniveau", "Playing style": "Spielstil",
      "Playing position": "Position", "Skates on or off?": "Schlittschuhe an oder aus?",
      "Ice conditions": "Eisbedingungen", "Preference": "Präferenz", "Beginner": "Standard",
      "Adult recreational": "Freizeitspieler", "Competitive": "Wettkampfspieler", "Elite": "Elite-Spieler",
      "Youth player": "Jugendspieler", "Youth (under 12)": "Jugend (unter 12)", "Junior (12–17)": "Junior (12–17)",
      "Senior (18+)": "Senior (18+)", "Forward": "Stürmer", "Defense": "Verteidiger", "Goalie / out player": "Torwart / Feldspieler",
      "Quick release and snapshots": "Schneller Release und Handgelenkschüsse", "Power shooter": "Kraftschütze",
      "Puck control and passing": "Puckkontrolle und Pässe", "Balanced all-around": "Ausgewogener Spielstil",
      "Skates on": "Mit Schlittschuhen", "Shoes / skates off": "Ohne Schuhe oder Schlittschuhe", "kg": "kg", "lb": "lb", "cm": "cm"
      ,"Final stick length (optional)": "Endgültige Schlägerlänge (optional)"
      ,"Add the expected length after cutting to account for the change in effective stiffness.": "Gib die erwartete Länge nach dem Kürzen ein, um die Änderung der gefühlten Steifigkeit zu berücksichtigen."
      ,"Check flex for this length →": "Flex für diese Länge prüfen →"
    },
    no: {
      "Hockey Tools": "Hockeyverktøy", "Language": "Språk", "Main navigation": "Hovednavigasjon",
      "Stick Flex": "Kølleflex", "Stick Length": "Køllelengde", "Skate Sharpening": "Skøytesliping", "Skate Profiling": "Skøyteprofilering",
      "English": "Engelsk", "Svenska": "Svensk", "Français": "Fransk", "Deutsch": "Tysk", "Norsk": "Norsk", "Dansk": "Dansk", "Suomi": "Finsk",
      "Independent educational tools for hockey players worldwide.": "Uavhengige læringsverktøy for hockeyspillere over hele verden.",
      "Player weight": "Spillerens vekt", "Player height": "Spillerens høyde", "Height": "Høyde",
      "Age group": "Aldersgruppe", "Skill level": "Ferdighetsnivå", "Playing style": "Spillestil",
      "Playing position": "Posisjon", "Skates on or off?": "Med eller uten skøyter?",
      "Ice conditions": "Isforhold", "Preference": "Preferanse", "Beginner": "Nybegynner",
      "Adult recreational": "Voksen mosjonist", "Competitive": "Konkurransespiller", "Elite": "Elitespiller",
      "Youth player": "Ungdomsspiller", "Youth (under 12)": "Ungdom (under 12)", "Junior (12–17)": "Junior (12–17)",
      "Senior (18+)": "Senior (18+)", "Forward": "Løper", "Defense": "Back", "Goalie / out player": "Målvakt / utespiller",
      "Quick release and snapshots": "Rask release og direkteskudd", "Power shooter": "Kraftskytter",
      "Puck control and passing": "Puckkontroll og pasninger", "Balanced all-around": "Balansert spillestil",
      "Skates on": "Med skøyter", "Shoes / skates off": "Uten sko eller skøyter", "kg": "kg", "lb": "lb", "cm": "cm"
    },
    da: {
      "Hockey Tools": "Hockeyværktøjer", "Language": "Sprog", "Main navigation": "Hovednavigation",
      "Stick Flex": "Stavflex", "Stick Length": "Stavlængde", "Skate Sharpening": "Skøjteslibning", "Skate Profiling": "Skøjteprofilering",
      "English": "Engelsk", "Svenska": "Svensk", "Français": "Fransk", "Deutsch": "Tysk", "Norsk": "Norsk", "Dansk": "Dansk", "Suomi": "Finsk",
      "Independent educational tools for hockey players worldwide.": "Uafhængige læringsværktøjer til hockeyspillere over hele verden.",
      "Player weight": "Spillerens vægt", "Player height": "Spillerens højde", "Height": "Højde",
      "Age group": "Aldersgruppe", "Skill level": "Færdighedsniveau", "Playing style": "Spillestil",
      "Playing position": "Position", "Skates on or off?": "Skøjter på eller af?",
      "Ice conditions": "Isforhold", "Preference": "Præference", "Beginner": "Begynder",
      "Adult recreational": "Voksen motionist", "Competitive": "Konkurrencespiller", "Elite": "Elitespiller",
      "Youth player": "Ungdomsspiller", "Youth (under 12)": "Ungdom (under 12)", "Junior (12–17)": "Junior (12–17)",
      "Senior (18+)": "Senior (18+)", "Forward": "Angriber", "Defense": "Forsvarer", "Goalie / out player": "Målmand / markspiller",
      "Quick release and snapshots": "Hurtigt release og håndledsskud", "Power shooter": "Kraftfuld skytte",
      "Puck control and passing": "Puckkontrol og afleveringer", "Balanced all-around": "Balanceret spillestil",
      "Skates on": "Med skøjter", "Shoes / skates off": "Uden sko eller skøjter", "kg": "kg", "lb": "lb", "cm": "cm"
    },
    fi: {
      "Hockey Tools": "Jääkiekko työkalut", "Language": "Kieli", "Main navigation": "Päänavigointi",
      "Stick Flex": "Mailan flex", "Stick Length": "Mailan pituus", "Skate Sharpening": "Luistinten teroitus", "Skate Profiling": "Luistimen profilointi",
      "English": "Englanti", "Svenska": "Ruotsi", "Français": "Ranska", "Deutsch": "Saksa", "Norsk": "Norja", "Dansk": "Tanska", "Suomi": "Suomi",
      "Independent educational tools for hockey players worldwide.": "Riippumattomia työkaluja jääkiekkoilijoille kaikkialla maailmassa.",
      "Player weight": "Pelaajan paino", "Player height": "Pelaajan pituus", "Height": "Pituus",
      "Age group": "Ikäryhmä", "Skill level": "Taitotaso", "Playing style": "Pelityyli",
      "Playing position": "Pelipaikka", "Skates on or off?": "Luistimet jalassa vai ilman?",
      "Ice conditions": "Jääolosuhteet", "Preference": "Toive", "Beginner": "Aloittelija",
      "Adult recreational": "Aikuinen harrastaja", "Competitive": "Kilpapelaaja", "Elite": "Huippupelaaja",
      "Youth player": "Nuori pelaaja", "Youth (under 12)": "Nuoret (alle 12)", "Junior (12–17)": "Juniorit (12–17)",
      "Senior (18+)": "Seniorit (18+)", "Forward": "Hyökkääjä", "Defense": "Puolustaja", "Goalie / out player": "Maalivahti / kenttäpelaaja",
      "Quick release and snapshots": "Nopea laukaisu ja suorat laukaukset", "Power shooter": "Voimakas laukoja",
      "Puck control and passing": "Kiekonhallinta ja syötöt", "Balanced all-around": "Tasapainoinen pelityyli",
      "Skates on": "Luistimet jalassa", "Shoes / skates off": "Ilman kenkiä tai luistimia", "kg": "kg", "lb": "lb", "cm": "cm"
    }
  };

  const pages = {
    home: {
      "Simple tools for better hockey gear decisions": ["Enkla verktyg för bättre hockeyutrustning", "Des outils simples pour mieux choisir son équipement", "Einfache Werkzeuge für bessere Ausrüstungsentscheidungen"],
      "Choose hockey gear with confidence.": ["Välj hockeyutrustning med trygghet.", "Choisissez votre équipement en toute confiance.", "Wähle deine Hockeyausrüstung mit Sicherheit."],
      "Free, practical calculators and guides for players, parents and coaches. Get a useful starting point in under a minute.": ["Gratis, praktiska kalkylatorer och guider för spelare, föräldrar och tränare. Få en bra utgångspunkt på mindre än en minut.", "Des calculateurs et guides pratiques gratuits pour joueurs, parents et entraîneurs. Obtenez un bon point de départ en moins d’une minute.", "Kostenlose, praktische Rechner und Ratgeber für Spieler, Eltern und Trainer. Erhalte in weniger als einer Minute einen guten Ausgangspunkt."],
      "Start with stick flex": ["Börja med klubbflex", "Commencer par le flex", "Mit Schläger-Flex beginnen"],
      "Three free tools": ["Tre kostnadsfria verktyg", "Trois outils gratuits", "Drei kostenlose Werkzeuge"],
      "Build a better setup": ["Bygg en bättre utrustning", "Améliorez votre équipement", "Baue eine bessere Ausrüstung"],
      "Made for every bench": ["För alla spelare", "Pour tous les bancs", "Für jede Mannschaft"],
      "Useful advice, not gear jargon.": ["Användbara råd, utan utrustningsjargong.", "Des conseils utiles, sans jargon.", "Nützliche Ratschläge statt Ausrüstungsjargon."],
      "Every result is a starting point. Comfort, confidence and ice time matter more than a perfect number. Test small changes and ask a qualified skate sharpener or coach when in doubt.": ["Alla resultat är en utgångspunkt. Komfort, trygghet och tid på isen är viktigare än ett perfekt tal. Testa små förändringar och fråga en kvalificerad skridskoslipare eller tränare om du är osäker.", "Chaque résultat est un point de départ. Le confort, la confiance et le temps passé sur la glace comptent plus qu’un chiffre parfait. Testez de petits changements et demandez conseil à un affûteur de patins qualifié ou à un entraîneur en cas de doute.", "Jedes Ergebnis ist ein Ausgangspunkt. Komfort, Selbstvertrauen und Zeit auf dem Eis sind wichtiger als eine perfekte Zahl. Teste kleine Änderungen und frage im Zweifel einen qualifizierten Schlittschuhschleifer oder Trainer."],
      "Youth players": ["Ungdomsspelare", "Joueurs jeunes", "Jugendspieler"], "Adult recreational players": ["Vuxna motionsspelare", "Adultes loisirs", "Erwachsene Freizeitspieler"],
      "Competitive players": ["Tävlingsspelare", "Joueurs compétitifs", "Wettkampfspieler"], "Parents": ["Föräldrar", "Parents", "Eltern"], "Hockey coaches": ["Hockeytränare", "Entraîneurs de hockey", "Hockeytrainer"],
      "Find a practical starting flex based on weight, position and playing style.": ["Hitta en praktisk startflex utifrån vikt, position och spelstil.", "Trouvez un flex de départ pratique selon le poids, la position et le style de jeu.", "Finde einen sinnvollen Start-Flex anhand von Gewicht, Position und Spielstil."],
      "Learn where your stick should reach in skates and in shoes.": ["Lär dig var klubban bör nå med skridskor och skor.", "Découvrez jusqu’où doit arriver votre crosse avec ou sans patins.", "Erfahre, wie hoch dein Schläger mit und ohne Schlittschuhe reichen sollte."],
      "Choose a starting hollow for grip, glide, weight and ice conditions.": ["Välj en startskålradie utifrån grepp, glid, vikt och isförhållanden.", "Choisissez un rayon de départ selon l’accroche, la glisse, le poids et la glace.", "Wähle einen Hohlschliff als Ausgangspunkt für Grip, Gleiten, Gewicht und Eisbedingungen."]
      ,"Hockey Stick Flex Calculator": ["Kalkylator för hockeyklubbans flex", "Calculateur de flex de crosse de hockey", "Hockeyschläger-Flex-Rechner"]
      ,"Hockey Stick Length Calculator": ["Kalkylator för hockeyklubbans längd", "Calculateur de longueur de crosse de hockey", "Hockeyschläger-Längenrechner"]
      ,"Skate Sharpening Guide": ["Guide för skridskoslipning", "Guide d’affûtage des patins", "Leitfaden zum Schlittschliff"]
      ,"Calculate flex →": ["Beräkna flex →", "Calculer le flex →", "Flex berechnen →"]
      ,"Find stick length →": ["Hitta klubblängd →", "Trouver la longueur de crosse →", "Schlägerlänge finden →"]
      ,"Choose a hollow →": ["Välj skålradie →", "Choisir un rayon →", "Hohlschliff wählen →"]
      ,"Hockey Tools": ["Hockeyverktyg", "Outils de hockey", "Hockey-Werkzeuge"]
      ,"Simple tools for better hockey gear decisions": ["Enkla verktyg för bättre hockeyutrustning", "Des outils simples pour mieux choisir son équipement", "Einfache Werkzeuge für bessere Ausrüstungsentscheidungen"]
    },
    flex: {
      "Free hockey equipment calculator": ["Gratis kalkylator för hockeyutrustning", "Calculateur gratuit d’équipement de hockey", "Kostenloser Hockey-Ausrüstungsrechner"],
      "Hockey Stick Flex Calculator": ["Kalkylator för hockeyklubbans flex", "Calculateur de flex de crosse de hockey", "Hockeyschläger-Flex-Rechner"],
      "Wondering what flex hockey stick you should use? Enter your details to get a recommended flex, practical range and an explanation you can use when shopping.": ["Undrar du vilken flex på hockeyklubban du ska välja? Fyll i dina uppgifter för att få en rekommenderad flex, ett praktiskt intervall och en förklaring som hjälper dig när du handlar.", "Vous vous demandez quel flex choisir ? Saisissez vos informations pour obtenir un flex recommandé, une fourchette pratique et une explication utile lors de vos achats.", "Du möchtest wissen, welchen Schläger-Flex du verwenden solltest? Gib deine Daten ein und erhalte einen empfohlenen Flex, einen praktischen Bereich und eine verständliche Erklärung für den Einkauf."],
      "Find your starting point": ["Hitta din utgångspunkt", "Trouvez votre point de départ", "Finde deinen Ausgangspunkt"],
      "What flex hockey stick should I use?": ["Vilken flex på hockeyklubban ska jag använda?", "Quel flex de crosse de hockey dois-je choisir ?", "Welchen Hockeyschläger-Flex sollte ich verwenden?"],
      "Stick flex describes how much a shaft bends under load. The right flex helps you load shots without sacrificing accuracy, puck control or comfort. This hockey stick flex calculator combines the traditional weight-based rule with height, age group, skill level and playing style.": ["Klubbflex beskriver hur mycket skaftet böjs under belastning. Rätt flex hjälper dig att ladda skotten utan att offra precision, puckkontroll eller komfort. Den här kalkylatorn kombinerar den traditionella viktregeln med längd, åldersgrupp, nivå och spelstil.", "Le flex décrit la flexion du manche sous la charge. Le bon flex aide à charger vos tirs sans sacrifier la précision, le contrôle du palet ni le confort. Ce calculateur combine la règle basée sur le poids avec la taille, l’âge, le niveau et le style de jeu.", "Der Schläger-Flex beschreibt, wie stark sich der Schaft unter Belastung biegt. Der richtige Flex unterstützt deine Schüsse, ohne Genauigkeit, Puckkontrolle oder Komfort zu beeinträchtigen. Dieser Rechner kombiniert die Gewichtsregel mit Größe, Altersgruppe, Niveau und Spielstil."],
      "Results are a starting recommendation, not a strict rule. Try a nearby flex when possible, especially if you cut the stick shorter or are between age categories.": ["Resultatet är en utgångspunkt, inte en fast regel. Testa gärna en närliggande flex, särskilt om du kapar klubban eller ligger mellan två ålderskategorier.", "Le résultat est un point de départ, pas une règle stricte. Testez si possible un flex voisin, surtout si vous raccourcissez la crosse ou êtes entre deux catégories d’âge.", "Das Ergebnis ist eine Orientierung, keine feste Regel. Teste nach Möglichkeit einen benachbarten Flex, besonders wenn du den Schläger kürzt oder zwischen Altersklassen liegst."],
      "Personalized recommendation": ["Personlig rekommendation", "Recommandation personnalisée", "Persönliche Empfehlung"],
      "Calculate your stick flex": ["Beräkna klubbans flex", "Calculez le flex de votre crosse", "Berechne deinen Schläger-Flex"],
      "Calculate recommended flex": ["Beräkna rekommenderad flex", "Calculer le flex recommandé", "Empfohlenen Flex berechnen"],
      "Your recommendation": ["Din rekommendation", "Votre recommandation", "Deine Empfehlung"],
      "Flex range:": ["Flexintervall:", "Fourchette de flex :", "Flex-Bereich:"],
      "Enter your details to see your personalized explanation.": ["Fyll i dina uppgifter för att se din personliga förklaring.", "Saisissez vos informations pour voir votre explication personnalisée.", "Gib deine Daten ein, um deine persönliche Erklärung zu sehen."],
      "Test the recommended flex and one step above or below. Cutting a stick shorter makes it feel stiffer.": ["Testa den rekommenderade flexen och ett steg över eller under. En kortare klubba känns styvare.", "Testez le flex recommandé et un cran au-dessus ou au-dessous. Raccourcir une crosse la rend plus rigide.", "Teste den empfohlenen Flex sowie einen Schritt darüber oder darunter. Ein gekürzter Schläger fühlt sich steifer an."],
      "Quick reference": ["Snabbreferens", "Référence rapide", "Schnellübersicht"],
      "Common hockey stick flex recommendations": ["Vanliga rekommendationer för hockeyklubbans flex", "Recommandations courantes de flex de crosse", "Übliche Empfehlungen für Hockeyschläger-Flex"],
      "Use these broad ranges as a youth hockey stick flex chart and senior hockey stick flex chart. Player strength and final stick height can move the best choice.": ["Använd dessa breda intervall som flexdiagram för ungdoms- och seniorklubbor. Spelarens styrka och klubbans slutliga längd kan påverka det bästa valet.", "Utilisez ces fourchettes comme repères pour les jeunes et les seniors. La force du joueur et la longueur finale de la crosse peuvent modifier le meilleur choix.", "Nutze diese Bereiche als Orientierung für Jugend- und Seniorenschläger. Kraft des Spielers und endgültige Schlägerlänge können die beste Wahl verändern."],
      "Player group": ["Spelargrupp", "Catégorie de joueur", "Spielergruppe"],
      "Typical weight": ["Typisk vikt", "Poids habituel", "Typisches Gewicht"],
      "Common flex": ["Vanlig flex", "Flex courant", "Üblicher Flex"],
      "Best starting point": ["Bästa utgångspunkt", "Meilleur point de départ", "Bester Ausgangspunkt"],
      "Easy to load": ["Lätt att belasta", "Facile à charger", "Leicht zu laden"],
      "Balanced control": ["Balanserad kontroll", "Contrôle équilibré", "Ausgewogene Kontrolle"],
      "Comfort and release": ["Komfort och skott", "Confort et déclenchement", "Komfort und Release"],
      "Load and stability": ["Belastning och stabilitet", "Charge et stabilité", "Belastung und Stabilität"],
      "Strength and power": ["Styrka och kraft", "Force et puissance", "Kraft und Power"],
      "Understand your result": ["Förstå ditt resultat", "Comprenez votre résultat", "Verstehe dein Ergebnis"],
      "How to choose the best hockey stick flex": ["Så väljer du bästa flex på hockeyklubban", "Comment choisir le meilleur flex de crosse", "So findest du den besten Hockeyschläger-Flex"],
      "A lower flex is easier to bend and can help younger, lighter or quick-release players load the shaft. A higher flex can feel more stable and powerful when a strong player can consistently bend it.": ["En lägre flex är lättare att böja och kan hjälpa yngre, lättare spelare eller spelare med snabba skott att belasta skaftet. En högre flex kan kännas stabilare och kraftfullare när en stark spelare kan böja den konsekvent.", "Un flex plus souple est plus facile à plier et peut aider les jeunes joueurs, les joueurs légers ou ceux qui privilégient un tir rapide. Un flex plus rigide peut sembler plus stable et puissant pour un joueur capable de le charger régulièrement.", "Ein niedrigerer Flex lässt sich leichter biegen und kann jüngeren, leichteren Spielern oder Spielern mit schnellem Release helfen. Ein höherer Flex kann sich stabiler und kraftvoller anfühlen, wenn ein kräftiger Spieler ihn zuverlässig laden kann."],
      "Three flex adjustments that matter": ["Tre viktiga flexjusteringar", "Trois ajustements importants du flex", "Drei wichtige Flex-Anpassungen"],
      "Stick height:": ["Klubblängd:", "Longueur de crosse :", "Schlägerlänge:"],
      "cutting the shaft shorter increases the effective stiffness.": ["ett kortare skaft ökar den upplevda styvheten.", "raccourcir le manche augmente la rigidité ressentie.", "ein kürzerer Schaft erhöht die gefühlte Steifigkeit."],
      "Skill level:": ["Färdighetsnivå:", "Niveau :", "Spielniveau:"],
      "beginners often benefit from a forgiving flex, while experienced shooters may prefer more stability.": ["spelare på standardnivå har ofta nytta av en mer förlåtande flex, medan vana skyttar kan föredra mer stabilitet.", "les joueurs de niveau standard profitent souvent d’un flex tolérant, tandis que les tireurs expérimentés peuvent préférer plus de stabilité.", "Spieler auf Standardniveau profitieren oft von einem gutmütigen Flex, während erfahrene Schützen mehr Stabilität bevorzugen können."],
      "Playing style:": ["Spelstil:", "Style de jeu :", "Spielstil:"],
      "quick-release players usually test softer; power shooters may test stiffer.": ["spelare med snabba skott testar vanligtvis mjukare flex, medan kraftfulla skyttar kan testa styvare flex.", "les joueurs au tir rapide testent généralement un flex plus souple ; les tireurs puissants peuvent essayer un flex plus rigide.", "Spieler mit schnellem Release testen meist weichere Flexe; Kraftschützen können steifere Flexe testen."],
      "Check your stick length →": ["Kontrollera klubbans längd →", "Vérifiez la longueur de votre crosse →", "Prüfe deine Schlägerlänge →"],
      "Read the skate sharpening guide →": ["Läs guiden för skridskoslipning →", "Lire le guide d’affûtage des patins →", "Lies den Leitfaden zum Schlittschliff →"],
      "Shop smarter": ["Handla smartare", "Achetez plus intelligemment", "Clever einkaufen"],
      "Compare sticks by flex": ["Jämför klubbor efter flex", "Comparez les crosses par flex", "Vergleiche Schläger nach Flex"],
      "Use your result as a filter when comparing youth, junior and senior sticks from hockey retailers.": ["Använd resultatet som filter när du jämför ungdoms-, junior- och seniorklubbor hos hockeybutiker.", "Utilisez votre résultat comme filtre pour comparer les crosses jeunes, juniors et seniors chez les revendeurs.", "Nutze dein Ergebnis als Filter beim Vergleich von Jugend-, Junior- und Seniorenschlägern im Handel."],
      "Browse hockey sticks →": ["Se hockeyklubbor →", "Voir les crosses de hockey →", "Hockeyschläger ansehen →"],
      "Affiliate link: we may earn a commission at no extra cost to you.": ["Annonslänk: vi kan få provision utan extra kostnad för dig.", "Lien affilié : nous pouvons recevoir une commission sans frais supplémentaires pour vous.", "Affiliate-Link: Wir können ohne zusätzliche Kosten für dich eine Provision erhalten."],
      "Common questions": ["Vanliga frågor", "Questions fréquentes", "Häufige Fragen"],
      "Hockey stick flex FAQ": ["Vanliga frågor om hockeyklubbans flex", "FAQ sur le flex des crosses de hockey", "FAQ zum Hockeyschläger-Flex"],
      "What flex hockey stick should I use?": ["Vilken flex på hockeyklubban ska jag använda?", "Quel flex de crosse dois-je choisir ?", "Welchen Hockeyschläger-Flex sollte ich verwenden?"],
      "What is the best hockey stick flex?": ["Vilken är den bästa flexen på en hockeyklubba?", "Quel est le meilleur flex de crosse ?", "Welcher Hockeyschläger-Flex ist am besten?"],
      "What flex should a youth hockey player use?": ["Vilken flex ska en ungdomsspelare använda?", "Quel flex choisir pour un jeune joueur ?", "Welchen Flex sollte ein Jugendspieler verwenden?"],
      "Does stick height change flex?": ["Påverkar klubbans längd flexen?", "La longueur de la crosse modifie-t-elle le flex ?", "Verändert die Schlägerlänge den Flex?"],
      "Can I use this as a senior hockey stick flex chart?": ["Kan jag använda detta som ett flexdiagram för seniorklubbor?", "Puis-je utiliser ce calculateur comme tableau de flex senior ?", "Kann ich dies als Flex-Tabelle für Seniorenschläger verwenden?"]
      ,"Youth": ["Ungdomsspelare", "Jeune joueur", "Jugendspieler"]
      ,"Junior": ["Juniorspelare", "Joueur junior", "Juniorenspieler"]
      ,"Senior": ["Senior", "Senior", "Senior"]
      ,"Senior recreational": ["Motionsspelare", "Joueur loisir", "Freizeitspieler"]
      ,"Senior competitive": ["Tävlingsspelare", "Joueur compétitif", "Wettkampfspieler"]
      ,"Senior / elite": ["Elitspelare", "Joueur élite", "Elite-Spieler"]
      ,"40–90 lb": ["18–41 kg", "18–41 kg", "18–41 kg"]
      ,"80–130 lb": ["36–59 kg", "36–59 kg", "36–59 kg"]
      ,"130–190 lb": ["59–86 kg", "59–86 kg", "59–86 kg"]
      ,"170–230 lb": ["77–104 kg", "77–104 kg", "77–104 kg"]
      ,"200+ lb": ["91+ kg", "91+ kg", "91+ kg"]
      ,"Does cutting a stick change flex?": ["Förändras flexen om jag kapar klubban?", "Couper la crosse modifie-t-il le flex ?", "Verändert das Kürzen des Schlägers den Flex?"]
      ,"How do I use a senior hockey stick flex chart?": ["Hur använder jag ett flexdiagram för seniorklubbor?", "Comment utiliser un tableau de flex senior ?", "Wie verwende ich eine Flex-Tabelle für Seniorenschläger?"]
      ,"Start near half your body weight in pounds, then adjust for age, height, skill and style. Test a small range rather than treating one number as exact.": ["Börja nära halva din kroppsvikt i pund och justera sedan efter ålder, längd, nivå och spelstil. Testa ett mindre intervall i stället för att se ett tal som exakt.", "Commencez près de la moitié de votre poids en livres, puis ajustez selon l’âge, la taille, le niveau et le style. Testez une petite plage plutôt que de considérer un seul chiffre comme exact.", "Beginne ungefähr mit der Hälfte deines Körpergewichts in Pfund und passe den Flex an Alter, Größe, Niveau und Spielstil an. Teste einen kleinen Bereich statt eine Zahl als exakt zu betrachten."]
      ,"The best flex is the one you can load comfortably while maintaining accuracy and puck control. Softer is not always better, and stiffer is not automatically more powerful.": ["Den bästa flexen är den du kan belasta bekvämt med bibehållen precision och puckkontroll. Mjukare är inte alltid bättre, och styvare är inte automatiskt kraftfullare.", "Le meilleur flex est celui que vous pouvez charger confortablement tout en gardant précision et contrôle du palet. Plus souple n’est pas toujours mieux, et plus rigide n’est pas automatiquement plus puissant.", "Der beste Flex ist der, den du bequem laden kannst und dabei Genauigkeit und Puckkontrolle behältst. Weicher ist nicht immer besser, und steifer ist nicht automatisch kraftvoller."]
      ,"Youth players generally need a softer flex they can bend without forcing the shot. Weight, height and confidence should guide the final choice.": ["Ungdomsspelare behöver vanligtvis en mjukare flex som de kan böja utan att forcera skottet. Vikt, längd och trygghet bör styra det slutliga valet.", "Les jeunes joueurs ont généralement besoin d’un flex plus souple qu’ils peuvent plier sans forcer le tir. Le poids, la taille et l’assurance doivent guider le choix final.", "Jugendspieler brauchen meist einen weicheren Flex, den sie ohne erzwungenen Schuss biegen können. Gewicht, Größe und Sicherheit sollten die endgültige Wahl bestimmen."]
      ,"Yes. Cutting the shaft shorter makes it feel stiffer, so choose and test the final stick length before making a large cut.": ["Ja. När skaftet kapas kortare känns det styvare, så välj och testa den slutliga klubblängden innan du kapar mycket.", "Oui. Raccourcir le manche le rend plus rigide ; choisissez et testez donc la longueur finale avant une coupe importante.", "Ja. Ein kürzer geschnittener Schaft fühlt sich steifer an. Wähle und teste daher die endgültige Länge vor einem großen Schnitt."]
      ,"Match your approximate weight to a range, then adjust for shooting style, strength and stick length. Our calculator combines those factors for a more personalized starting point.": ["Matcha din ungefärliga vikt mot ett intervall och justera sedan efter skottstil, styrka och klubblängd. Vår kalkylator kombinerar faktorerna för en mer personlig startpunkt.", "Comparez votre poids approximatif à une plage, puis ajustez selon le style de tir, la force et la longueur de la crosse. Notre calculateur combine ces facteurs pour un point de départ plus personnalisé.", "Ordne dein ungefähres Gewicht einem Bereich zu und passe dann Schussstil, Kraft und Schlägerlänge an. Unser Rechner verbindet diese Faktoren zu einem persönlicheren Ausgangspunkt."]
      },
      length: {
        "Free hockey equipment calculator": ["Gratis kalkylator för hockeyutrustning", "Calculateur gratuit d’équipement de hockey", "Kostenloser Hockey-Ausrüstungsrechner"],
        "Hockey Stick Length Calculator": ["Kalkylator för hockeyklubbans längd", "Calculateur de longueur de crosse de hockey", "Hockeyschläger-Längenrechner"],
        "Find the correct hockey stick length for your height, skates, age group and playing position.": ["Hitta rätt längd på hockeyklubban utifrån din längd, skridskor, åldersgrupp och position.", "Trouvez la bonne longueur de crosse selon votre taille, vos patins, votre catégorie d’âge et votre position.", "Finde die richtige Hockeyschlägerlänge anhand deiner Größe, Schlittschuhe, Altersgruppe und Position."],
        "Choose the right size": ["Välj rätt storlek", "Choisissez la bonne taille", "Wähle die richtige Größe"],
        "How long should my hockey stick be?": ["Hur lång ska min hockeyklubba vara?", "Quelle doit être la longueur de ma crosse ?", "Wie lang sollte mein Hockeyschläger sein?"],
        "The right stick length helps you skate, handle the puck and shoot with a balanced stance. A common starting point is around the chin with skates on, but height, age, position and personal preference all matter.": ["Rätt klubblängd hjälper dig att åka skridskor, hantera pucken och skjuta med en balanserad hållning. En vanlig utgångspunkt är ungefär vid hakan med skridskor på, men längd, ålder, position och personlig preferens spelar också roll.", "La bonne longueur vous aide à patiner, contrôler le palet et tirer avec une posture équilibrée. Un bon point de départ se situe près du menton avec les patins, mais la taille, l’âge, la position et les préférences comptent aussi.", "Die richtige Schlägerlänge unterstützt Eislaufen, Puckkontrolle und Schüsse in einer ausgewogenen Haltung. Mit Schlittschuhen ist Kinnhöhe ein guter Ausgangspunkt, aber Größe, Alter, Position und Vorlieben zählen ebenfalls."],
        "Use this calculator before you shop, then confirm the actual stick in your skating stance. A stick that is too long can be hard to control; one that is too short may reduce reach and leverage.": ["Använd kalkylatorn innan du handlar och kontrollera sedan klubban i din skridskohållning. En för lång klubba kan vara svår att kontrollera, medan en för kort kan minska räckvidd och hävstång.", "Utilisez ce calculateur avant vos achats, puis vérifiez la crosse dans votre posture de patinage. Une crosse trop longue est difficile à contrôler ; une crosse trop courte réduit la portée et le levier.", "Nutze den Rechner vor dem Kauf und prüfe den Schläger anschließend in deiner Haltung. Ein zu langer Schläger kann schwer zu kontrollieren sein; ein zu kurzer verringert Reichweite und Hebelwirkung."],
        "Personalized recommendation": ["Personlig rekommendation", "Recommandation personnalisée", "Persönliche Empfehlung"],
        "Calculate your stick length": ["Beräkna klubbans längd", "Calculez la longueur de votre crosse", "Berechne deine Schlägerlänge"],
        "Player height": ["Spelarens längd", "Taille du joueur", "Spielergröße"],
        "Enter height in centimetres.": ["Ange längden i centimeter.", "Saisissez la taille en centimètres.", "Gib die Größe in Zentimetern ein."],
        "Skates on or off?": ["Skridskor på eller av?", "Patins chaussés ou non ?", "Schlittschuhe an oder aus?"],
        "Skates on": ["Med skridskor", "Avec les patins", "Mit Schlittschuhen"],
        "Shoes / skates off": ["Utan skor eller skridskor", "Sans chaussures ni patins", "Ohne Schuhe oder Schlittschuhe"],
        "Playing position": ["Spelposition", "Position de jeu", "Spielposition"],
        "Calculate stick length": ["Beräkna klubblängd", "Calculer la longueur de la crosse", "Schlägerlänge berechnen"],
        "Recommended stick length": ["Rekommenderad klubblängd", "Longueur de crosse recommandée", "Empfohlene Schlägerlänge"],
        "Acceptable range:": ["Godkänt intervall:", "Fourchette acceptable :", "Akzeptabler Bereich:"],
        "Enter your details to see your personalized explanation.": ["Fyll i dina uppgifter för att se din personliga förklaring.", "Saisissez vos informations pour voir votre explication personnalisée.", "Gib deine Daten ein, um deine persönliche Erklärung zu sehen."],
        "With skates on, many players prefer the top near the chin. Always check blade contact and stance before cutting.": ["Med skridskor på föredrar många att skaftet når nära hakan. Kontrollera alltid att klubbans blad har kontakt med isen och att du står naturligt innan du kapar.", "Avec les patins, beaucoup de joueurs préfèrent que le manche arrive près du menton. Vérifiez toujours le contact de la palette de la crosse avec la glace et votre posture avant de couper.", "Mit Schlittschuhen reicht der Schläger bei vielen Spielern bis nahe ans Kinn. Prüfe vor dem Kürzen immer, ob das Schlägerblatt auf dem Eis aufliegt und die Haltung stimmt."],
        "Quick reference": ["Snabbreferens", "Référence rapide", "Schnellübersicht"],
        "Hockey stick sizing chart": ["Storlekstabell för hockeyklubbor", "Tableau des tailles de crosses de hockey", "Hockeyschläger-Größentabelle"],
        "This youth hockey stick size chart and adult reference provide broad starting points. Always prioritize the player’s actual height and comfortable stance.": ["Den här storlekstabellen för ungdomsklubbor och vuxenreferensen ger breda utgångspunkter. Utgå alltid från spelarens faktiska längd och bekväma hållning.", "Ce tableau pour jeunes et cette référence adulte donnent des points de départ généraux. Privilégiez toujours la taille réelle et la posture confortable du joueur.", "Diese Tabelle für Jugendspieler und die Erwachsenenreferenz bieten allgemeine Ausgangspunkte. Entscheidend sind immer die tatsächliche Größe und eine bequeme Haltung."],
        "Category": ["Kategori", "Catégorie", "Kategorie"],
        "Typical height": ["Typisk längd", "Taille habituelle", "Typische Größe"],
        "Stick class": ["Klubbklass", "Catégorie de crosse", "Schlägerklasse"],
        "Approx. length": ["Ungefärlig längd", "Longueur approximative", "Ungefähre Länge"],
        "Defense preference": ["Backpreferens", "Préférence défense", "Verteidiger-Präferenz"],
        "Any category": ["Alla kategorier", "Toutes catégories", "Jede Kategorie"],
        "Same class": ["Samma klass", "Même catégorie", "Gleiche Klasse"],
        "Add about 1–2 in": ["Lägg till cirka 2–5 cm", "Ajouter environ 2–5 cm", "Etwa 2–5 cm hinzufügen"],
        "Buying guide": ["Köpguide", "Guide d’achat", "Kaufberatung"],
        "How to choose the correct hockey stick length": ["Så väljer du rätt längd på hockeyklubban", "Comment choisir la bonne longueur de crosse", "So findest du die richtige Hockeyschlägerlänge"],
        "Stand in your skates with the blade on the ice and your hands in a natural hockey stance. For many forwards, the shaft reaches around the chin. A player who wants more reach, poke-check range or leverage may prefer closer to the nose.": ["Stå i skridskorna med klubbans blad på isen och händerna i en naturlig hockeyhållning. För många forwards når skaftet ungefär till hakan. Den som vill ha mer räckvidd, räckvidd vid petningar eller hävstång kan föredra närmare näsan.", "Tenez-vous sur vos patins, palette de la crosse sur la glace et mains en posture naturelle. Pour beaucoup d’attaquants, le manche arrive près du menton. Les joueurs qui veulent plus de portée ou de levier peuvent préférer le nez.", "Stelle dich mit dem Schlägerblatt auf dem Eis und den Händen in natürlicher Hockeyhaltung hin. Für viele Stürmer reicht der Schaft bis etwa zum Kinn. Wer mehr Reichweite oder Hebelwirkung möchte, kann eine Länge bis zur Nase bevorzugen."],
        "Hockey stick length buying tips": ["Tips när du köper hockeyklubba", "Conseils pour acheter une crosse", "Tipps zum Kauf eines Hockeyschlägers"],
        "Buy for today’s stance:": ["Köp för dagens hållning:", "Achetez pour la posture actuelle :", "Kaufe für die heutige Haltung:"],
        "do not choose an excessively long stick just to grow into it.": ["välj inte en överdrivet lång klubba bara för att växa i den.", "ne choisissez pas une crosse excessivement longue pour la croissance.", "wähle keinen übermäßig langen Schläger nur zum Hineinwachsen."],
        "Calculate your stick flex →": ["Beräkna klubbans flex →", "Calculer le flex de votre crosse →", "Schläger-Flex berechnen →"],
        "Find your stick length →": ["Hitta klubblängd →", "Trouver la longueur de crosse →", "Schlägerlänge finden →"],
        "Remember flex:": ["Kom ihåg flexen:", "N’oubliez pas le flex :", "Denke an den Flex:"],
        "cutting a stick shorter makes it feel stiffer, which can affect shooting.": ["en kortare klubba känns styvare, vilket kan påverka skotten.", "raccourcir une crosse la rend plus rigide et peut modifier les tirs.", "ein gekürzter Schläger fühlt sich steifer an und kann das Schießen beeinflussen."],
        "Check the blade:": ["Kontrollera bladet:", "Vérifiez la lame :", "Prüfe das Blatt:"],
        "the blade should sit flat while skating and handling the puck.": ["bladet ska ligga plant när du åker och hanterar pucken.", "la lame doit rester à plat en patinant et en contrôlant le palet.", "das Blatt sollte beim Eislaufen und bei der Puckkontrolle flach aufliegen."],
        "Position is a preference:": ["Positionen är en preferens:", "La position est une préférence :", "Die Position ist eine Vorliebe:"],
        "defense players often add length, while forwards may favor control.": ["backar lägger ofta till längd, medan forwards kan föredra kontroll.", "les défenseurs ajoutent souvent de la longueur, tandis que les attaquants privilégient le contrôle.", "Verteidiger wählen oft mehr Länge, während Stürmer Kontrolle bevorzugen."],
        "Calculate your stick flex →": ["Beräkna klubbans flex →", "Calculer le flex de votre crosse →", "Schläger-Flex berechnen →"],
        "Read the skate sharpening guide →": ["Läs guiden för skridskoslipning →", "Lire le guide d’affûtage des patins →", "Leitfaden zum Schlittschliff lesen →"],
        "Find sticks by size": ["Hitta klubbor efter storlek", "Trouvez des crosses par taille", "Finde Schläger nach Größe"],
        "Compare youth, junior, intermediate and senior sticks after checking your target length and flex.": ["Jämför ungdoms-, junior-, intermediate- och seniorklubbor när du har kontrollerat önskad längd och flex.", "Comparez les crosses jeunes, juniors, intermédiaires et seniors après avoir vérifié votre longueur et votre flex.", "Vergleiche Jugend-, Junior-, Intermediate- und Seniorenschläger nach Prüfung von Länge und Flex."],
        "Browse hockey sticks →": ["Se hockeyklubbor →", "Voir les crosses de hockey →", "Hockeyschläger ansehen →"],
        "Hockey stick length FAQ": ["Vanliga frågor om hockeyklubbans längd", "FAQ sur la longueur des crosses", "FAQ zur Hockeyschlägerlänge"],
        "Do defense players need a longer stick?": ["Behöver backar en längre klubba?", "Les défenseurs ont-ils besoin d’une crosse plus longue ?", "Brauchen Verteidiger einen längeren Schläger?"],
        "What size hockey stick does a youth player need?": ["Vilken storlek på hockeyklubba behöver en ungdomsspelare?", "Quelle taille de crosse faut-il à un jeune joueur ?", "Welche Schlägergröße braucht ein Jugendspieler?"],
        "Can I cut a hockey stick shorter?": ["Kan jag kapa en hockeyklubba?", "Puis-je raccourcir une crosse de hockey ?", "Kann ich einen Hockeyschläger kürzen?"],
        "Should a hockey stick reach my chin or nose?": ["Ska hockeyklubban nå hakan eller näsan?", "La crosse doit-elle arriver au menton ou au nez ?", "Sollte der Schläger bis zum Kinn oder zur Nase reichen?"],
        "For many players, the stick reaches around the chin while wearing skates. Forwards may choose slightly shorter for control, while defense players often prefer extra reach.": ["För många spelare når klubban ungefär till hakan med skridskor på. Forwards kan välja något kortare för bättre kontroll, medan backar ofta föredrar extra räckvidd.", "Pour beaucoup de joueurs, la crosse arrive près du menton avec les patins. Les attaquants peuvent choisir légèrement plus court pour le contrôle, tandis que les défenseurs préfèrent souvent plus de portée.", "Für viele Spieler reicht der Schläger mit Schlittschuhen etwa bis zum Kinn. Stürmer wählen für mehr Kontrolle oft eine kürzere Länge, während Verteidiger zusätzliche Reichweite bevorzugen."],
        "With skates on, the top commonly lands between the chin and nose. Chin height favors handling; closer to the nose provides more reach and leverage.": ["Med skridskor på hamnar toppen vanligtvis mellan hakan och näsan. Hakhöjd gynnar puckkontroll, medan näshöjd ger mer räckvidd och hävstång.", "Avec les patins, le haut arrive généralement entre le menton et le nez. Le menton favorise le contrôle ; le nez offre davantage de portée et de levier.", "Mit Schlittschuhen liegt das Schaftende meist zwischen Kinn und Nase. Kinnhöhe unterstützt die Kontrolle, Nasenhöhe bietet mehr Reichweite und Hebelwirkung."],
        "Many defense players prefer one or two extra inches for poke checks and reach, but the player must still be able to control the puck comfortably.": ["Många backar föredrar 2–5 cm extra för petningar och räckvidd, men spelaren måste fortfarande kunna kontrollera pucken bekvämt.", "Beaucoup de défenseurs préfèrent 2 à 5 cm supplémentaires pour les poke-checks et la portée, mais le joueur doit toujours contrôler le palet confortablement.", "Viele Verteidiger bevorzugen 2–5 cm mehr für Poke-Checks und Reichweite, aber der Spieler muss den Puck weiterhin sicher kontrollieren können."],
        "Use height, age group and actual stance together. Avoid choosing an excessively long stick for growth because it can hurt control and change flex.": ["Använd längd, åldersgrupp och faktisk hållning tillsammans. Undvik en överdrivet lång klubba för att växa i den, eftersom det kan försämra kontrollen och ändra flexen.", "Tenez compte de la taille, de l’âge et de la posture réelle. Évitez une crosse trop longue pour la croissance, car elle peut réduire le contrôle et modifier le flex.", "Berücksichtige Größe, Altersgruppe und tatsächliche Haltung. Vermeide einen überlangen Schläger zum Hineinwachsen, da er die Kontrolle verschlechtern und den Flex verändern kann."],
        "Yes, but cutting makes it feel stiffer. Measure and test the desired length before making a permanent cut.": ["Ja, men en kapad klubba känns styvare. Mät och testa önskad längd innan du gör en permanent kapning.", "Oui, mais elle deviendra plus rigide. Mesurez et testez la longueur souhaitée avant une coupe définitive.", "Ja, aber ein gekürzter Schläger fühlt sich steifer an. Miss und teste die gewünschte Länge vor dem endgültigen Kürzen."]
      },
      sharpening: {
        "Free hockey equipment guide": ["Gratis guide till hockeyutrustning", "Guide gratuit d’équipement de hockey", "Kostenloser Hockey-Ausrüstungsratgeber"],
        "Hockey Skate Sharpening Guide": ["Guide för skridskoslipning", "Guide d’affûtage des patins", "Leitfaden zum Schlittschliff"],
        "Find a standard starting hollow for grip and glide, then learn what to try next when your edges do not feel right.": ["Hitta en standardiserad startskålradie för grepp och glid, och lär dig vad du kan prova när kanterna inte känns rätt.", "Trouvez un rayon de départ standard pour l’accroche et la glisse, puis découvrez quoi essayer si vos carres ne conviennent pas.", "Finde einen standardmäßigen Hohlschliff für Grip und Gleiten und erfahre, was du als Nächstes testen kannst, wenn sich die Kanten nicht richtig anfühlen."],
        "Choose your hollow": ["Välj skålradie", "Choisissez votre rayon", "Wähle deinen Hohlschliff"],
        "What hollow should I use?": ["Vilken skålradie ska jag använda?", "Quel rayon dois-je choisir ?", "Welchen Hohlschliff sollte ich wählen?"],
        "Personalized recommendation": ["Personlig rekommendation", "Recommandation personnalisée", "Persönliche Empfehlung"],
        "Find your starting hollow": ["Hitta din startskålradie", "Trouvez votre rayon de départ", "Finde deinen Ausgangs-Hohlschliff"],
        "Player weight": ["Spelarens vikt", "Poids du joueur", "Spielergewicht"],
        "Skill level": ["Färdighetsnivå", "Niveau", "Spielniveau"],
        "Ice conditions": ["Isförhållanden", "Conditions de glace", "Eisbedingungen"],
        "Preference": ["Preferens", "Préférence", "Vorliebe"],
        "Balanced grip and glide": ["Balanserat grepp och glid", "Accroche et glisse équilibrées", "Ausgewogener Grip und Gleitfähigkeit"],
        "More grip and bite": ["Mer grepp och bett", "Plus d’accroche", "Mehr Grip und Biss"],
        "More glide and speed": ["Mer glid och fart", "Plus de glisse et de vitesse", "Mehr Gleiten und Geschwindigkeit"],
        "Find my hollow": ["Hitta min skålradie", "Trouver mon rayon", "Meinen Hohlschliff finden"],
        "Recommended hollow radius": ["Rekommenderad skålradie", "Rayon recommandé", "Empfohlener Hohlschliff"],
        "Alternative options:": ["Alternativa val:", "Options alternatives :", "Alternativen:"],
        "Quick reference": ["Snabbreferens", "Référence rapide", "Schnellübersicht"],
        "Skate sharpening chart": ["Tabell för skridskoslipning", "Tableau d’affûtage des patins", "Schlittschliff-Tabelle"],
        "Compare your options": ["Jämför dina alternativ", "Comparez vos options", "Vergleiche deine Optionen"],
        "Radius comparison: grip vs glide": ["Jämförelse: grepp kontra glid", "Comparaison : accroche et glisse", "Vergleich: Grip und Gleiten"],
        "Beginner guide": ["Standardguide", "Guide standard", "Standardleitfaden"],
        "How to adjust your sharpening": ["Så justerar du slipningen", "Comment ajuster votre affûtage", "So passt du deinen Schliff an"],
        "5/8 vs 1/2 skate sharpening": ["5/8\" (16 mm) kontra 1/2\" (13 mm) skridskoslipning", "Affûtage 5/8\" (16 mm) contre 1/2\" (13 mm)", "5/8\" (16 mm) gegenüber 1/2\" (13 mm) Schlittschliff"],
        "Protect your edges": ["Skydda dina kanter", "Protégez vos carres", "Schütze deine Kanten"],
        "Shop skate care essentials": ["Köp tillbehör för skridskovård", "Achetez les essentiels d’entretien", "Wichtige Schlittschuhpflege kaufen"],
        "Common questions": ["Vanliga frågor", "Questions fréquentes", "Häufige Fragen"],
        "Hockey skate sharpening FAQ": ["Vanliga frågor om skridskoslipning", "FAQ sur l’affûtage des patins", "FAQ zum Schlittschliff"]
        ,"Hollow": ["Skålradie", "Rayon", "Hohlschliff"], "Feel": ["Känsla", "Sensation", "Gefühl"], "Good for": ["Passar för", "Idéal pour", "Geeignet für"], "Trade-off": ["Kompromiss", "Compromis", "Kompromiss"]
        ,"Radius": ["Radie", "Rayon", "Radius"], "Edge bite": ["Kantbett", "Accroche des carres", "Kantenbiss"], "Glide": ["Glid", "Glisse", "Gleiten"], "Beginner note": ["Standardtips", "Conseil standard", "Standardhinweis"]
      },
      sharpening: {
        "Free hockey equipment guide": ["Gratis guide till hockeyutrustning", "Guide gratuit d’équipement de hockey", "Kostenloser Hockey-Ausrüstungsratgeber"],
        "Hockey Skate Sharpening Guide": ["Guide för skridskoslipning", "Guide d’affûtage des patins", "Leitfaden zum Schlittschliff"],
        "Find a standard starting hollow for grip and glide, then learn what to try next when your edges do not feel right.": ["Hitta en standardiserad startskålradie för grepp och glid, och lär dig vad du kan prova när kanterna inte känns rätt.", "Trouvez un rayon de départ standard pour l’accroche et la glisse, puis découvrez quoi essayer si vos carres ne conviennent pas.", "Finde einen standardmäßigen Hohlschliff für Grip und Gleiten und erfahre, was du als Nächstes testen kannst, wenn sich die Kanten nicht richtig anfühlen."],
        "Choose your hollow": ["Välj skålradie", "Choisissez votre rayon", "Wähle deinen Hohlschliff"],
        "What hollow should I use?": ["Vilken skålradie ska jag använda?", "Quel rayon dois-je choisir ?", "Welchen Hohlschliff sollte ich wählen?"],
        "The hollow is the curved groove cut between the two edges of a skate blade. A smaller number, such as 1/2 inch, cuts a deeper groove and usually gives more grip. A larger number, such as 3/4 inch, gives a shallower groove and usually more glide.": ["Skålradien är det böjda spåret mellan skridskoskenans två kanter. Ett mindre tal, som 1/2 tum (13 mm), ger ett djupare spår och vanligtvis mer grepp. Ett större tal, som 3/4 tum (19 mm), ger ett grundare spår och vanligtvis mer glid.", "Le rayon est la rainure courbe entre les deux carres de la lame. Un petit rayon, comme 1/2 pouce (13 mm), crée une rainure plus profonde et généralement plus d’accroche. Un grand rayon, comme 3/4 pouce (19 mm), crée une rainure moins profonde et généralement plus de glisse.", "Der Hohlschliff ist die gebogene Rille zwischen den beiden Kanten einer Kufe. Eine kleinere Zahl wie 1/2 Zoll (13 mm) erzeugt eine tiefere Rille und meist mehr Grip. Eine größere Zahl wie 3/4 Zoll (19 mm) erzeugt eine flachere Rille und meist mehr Gleiten."],
        "There is no single best hockey skate hollow. This calculator gives you a sensible starting point using weight, skill, ice and preference. Your sharpener, skating technique and actual feel should make the final decision.": ["Det finns ingen bästa skålradie för alla. Kalkylatorn ger en rimlig startpunkt utifrån vikt, nivå, is och preferens. Sliparen, din teknik och hur skridskorna faktiskt känns bör avgöra slutvalet.", "Il n’existe pas un rayon idéal pour tout le monde. Ce calculateur fournit un point de départ selon le poids, le niveau, la glace et vos préférences. Votre affûteur, votre technique et vos sensations doivent guider le choix final.", "Es gibt keinen besten Hohlschliff für alle. Dieser Rechner liefert anhand von Gewicht, Niveau, Eis und Vorliebe einen sinnvollen Ausgangspunkt. Schliff, Technik und dein tatsächliches Gefühl sollten die endgültige Entscheidung bestimmen."],
        "Personalized recommendation": ["Personlig rekommendation", "Recommandation personnalisée", "Persönliche Empfehlung"],
        "Find your starting hollow": ["Hitta din startskålradie", "Trouvez votre rayon de départ", "Finde deinen Ausgangs-Hohlschliff"],
        "Player weight": ["Spelarens vikt", "Poids du joueur", "Spielergewicht"],
        "Weight unit": ["Viktenhet", "Unité de poids", "Gewichtseinheit"],
        "Skill level": ["Färdighetsnivå", "Niveau", "Spielniveau"],
        "Youth player": ["Ungdomsspelare", "Jeune joueur", "Jugendspieler"],
        "Ice conditions": ["Isförhållanden", "Conditions de glace", "Eisbedingungen"],
        "Hard / fast ice": ["Hård / snabb is", "Glace dure / rapide", "Hartes / schnelles Eis"],
        "Soft / slow ice": ["Mjuk / långsam is", "Glace souple / lente", "Weiches / langsames Eis"],
        "Mixed ice": ["Blandad is", "Glace mixte", "Gemischtes Eis"],
        "Preference": ["Preferens", "Préférence", "Vorliebe"],
        "Balanced grip and glide": ["Balanserat grepp och glid", "Accroche et glisse équilibrées", "Ausgewogener Grip und Gleitfähigkeit"],
        "More grip and bite": ["Mer grepp och bett", "Plus d’accroche", "Mehr Grip und Biss"],
        "More glide and speed": ["Mer glid och fart", "Plus de glisse et de vitesse", "Mehr Gleiten und Geschwindigkeit"],
        "Find my hollow": ["Hitta min skålradie", "Trouver mon rayon", "Meinen Hohlschliff finden"],
        "Recommended hollow radius": ["Rekommenderad skålradie", "Rayon recommandé", "Empfohlener Hohlschliff"],
        "Enter your details to see your personalized explanation.": ["Fyll i dina uppgifter för att se din personliga förklaring.", "Saisissez vos informations pour voir votre explication personnalisée.", "Gib deine Daten ein, um deine persönliche Erklärung zu sehen."],
        "Alternative options:": ["Alternativa val:", "Options alternatives :", "Alternativen:"],
        "Change one variable at a time and tell your sharpener exactly what you felt on the ice.": ["Ändra en variabel i taget och berätta exakt för sliparen hur det kändes på isen.", "Ne changez qu’une variable à la fois et décrivez précisément vos sensations sur la glace à l’affûteur.", "Ändere jeweils nur eine Variable und beschreibe dem Schleifer genau, wie es sich auf dem Eis angefühlt hat."],
        "Quick reference": ["Snabbreferens", "Référence rapide", "Schnellübersicht"],
        "Skate sharpening chart": ["Tabell för skridskoslipning", "Tableau d’affûtage des patins", "Schlittschliff-Tabelle"],
        "These are general starting points. Weight, technique and ice temperature can change how each radius feels.": ["Det här är allmänna startpunkter. Vikt, teknik och istemperatur kan påverka hur varje skålradie känns.", "Ces indications sont générales. Le poids, la technique et la température de la glace peuvent modifier les sensations de chaque rayon.", "Dies sind allgemeine Ausgangspunkte. Gewicht, Technik und Eistemperatur können das Gefühl jedes Hohlschliffs verändern."],
        "Hollow": ["Skålradie", "Rayon", "Hohlschliff"],
        "Feel": ["Känsla", "Sensation", "Gefühl"],
        "Good for": ["Passar för", "Idéal pour", "Geeignet für"],
        "Trade-off": ["Kompromiss", "Compromis", "Kompromiss"],
        "Compare your options": ["Jämför dina alternativ", "Comparez vos options", "Vergleiche deine Optionen"],
        "Radius comparison: grip vs glide": ["Jämförelse: grepp kontra glid", "Comparaison : accroche et glisse", "Vergleich: Grip und Gleiten"],
        "Radius": ["Radie", "Rayon", "Radius"],
        "Edge bite": ["Kantbett", "Accroche des carres", "Kantenbiss"],
        "Glide": ["Glid", "Glisse", "Gleiten"],
        "Beginner note": ["Standardtips", "Conseil standard", "Standardhinweis"],
        "Beginner guide": ["Standardguide", "Guide standard", "Standardleitfaden"],
        "How to adjust your sharpening": ["Så justerar du slipningen", "Comment ajuster votre affûtage", "So passt du deinen Schliff an"],
        "Calculate your stick flex →": ["Beräkna klubbans flex →", "Calculer le flex de votre crosse →", "Schläger-Flex berechnen →"],
        "Find your stick length →": ["Hitta klubblängd →", "Trouver la longueur de crosse →", "Schlägerlänge finden →"],
        "5/8 vs 1/2 skate sharpening": ["5/8\" (16 mm) kontra 1/2\" (13 mm) skridskoslipning", "Affûtage 5/8\" (16 mm) contre 1/2\" (13 mm)", "5/8\" (16 mm) gegenüber 1/2\" (13 mm) Schlittschliff"],
        "Protect your edges": ["Skydda dina kanter", "Protégez vos carres", "Schütze deine Kanten"],
        "Shop skate care essentials": ["Köp tillbehör för skridskovård", "Achetez les essentiels d’entretien", "Wichtige Schlittschuhpflege kaufen"],
        "Common questions": ["Vanliga frågor", "Questions fréquentes", "Häufige Fragen"],
        "Hockey skate sharpening FAQ": ["Vanliga frågor om skridskoslipning", "FAQ sur l’affûtage des patins", "FAQ zum Schlittschliff"]
        ,"What hollow should I use for hockey skates?": ["Vilken skålradie ska jag använda för hockeyskridskor?", "Quel rayon choisir pour les patins de hockey ?", "Welchen Hohlschliff sollte ich für Hockeyschlittschuhe wählen?"]
        ,"What is the best hockey skate hollow?": ["Vilken är den bästa skålradien för hockeyskridskor?", "Quel est le meilleur rayon pour les patins de hockey ?", "Welcher Hohlschliff ist für Hockeyschlittschuhe am besten?"]
        ,"What is the difference between 5/8 and 1/2 skate sharpening?": ["Vad är skillnaden mellan 5/8 och 1/2 skridskoslipning?", "Quelle est la différence entre un affûtage 5/8 et 1/2 ?", "Was ist der Unterschied zwischen 5/8 und 1/2 Schlittschliff?"]
        ,"How do I choose between 3/4 and 7/8?": ["Hur väljer jag mellan 3/4\" (19 mm) och 7/8\" (22 mm)?", "Comment choisir entre 3/4\" (19 mm) et 7/8\" (22 mm) ?", "Wie wähle ich zwischen 3/4\" (19 mm) und 7/8\" (22 mm)?"]
        ,"How often should hockey skates be sharpened?": ["Hur ofta ska hockeyskridskor slipas?", "À quelle fréquence faut-il affûter les patins ?", "Wie oft sollten Hockeyschlittschuhe geschliffen werden?"]
        ,"If your skates slip during stops or turns, try a smaller hollow for more bite. If your legs feel tired, your skates feel stuck to the ice or you want easier speed, try a larger hollow for more glide.": ["Om skridskorna släpper i stopp eller svängar, prova en mindre skålradie för mer bett. Om benen blir trötta, skridskorna känns fast mot isen eller du vill ha lättare fart, prova en större skålradie för mer glid.", "Si vos patins dérapent dans les arrêts ou les virages, essayez un rayon plus petit pour plus d’accroche. Si vos jambes fatiguent ou si vous voulez plus de vitesse, essayez un rayon plus grand pour plus de glisse.", "Wenn die Schlittschuhe bei Stopps oder Kurven rutschen, teste einen kleineren Hohlschliff für mehr Biss. Bei müden Beinen oder wenn du leichter gleiten möchtest, teste einen größeren Hohlschliff."]
        ,"The difference is simple: 1/2 inch is deeper and more aggressive, while 5/8 inch is shallower and more forgiving. Start at 5/8 unless you know you need extra grip, then test 1/2 if you are sliding out on hard ice.": ["Skillnaden är enkel: 1/2 tum (13 mm) är djupare och mer aggressiv, medan 5/8 tum (16 mm) är grundare och mer förlåtande. Börja med 5/8 om du inte vet att du behöver extra grepp och testa sedan 1/2 om du glider i hårda isförhållanden.", "La différence est simple : 1/2 pouce (13 mm) est plus profond et agressif, tandis que 5/8 pouce (16 mm) est moins profond et plus tolérant. Commencez par 5/8, puis testez 1/2 si vous glissez sur glace dure.", "Der Unterschied ist einfach: 1/2 Zoll (13 mm) ist tiefer und aggressiver, 5/8 Zoll (16 mm) flacher und gutmütiger. Beginne mit 5/8 und teste 1/2 nur, wenn du auf hartem Eis wegrutschst."]
        ,"Use guards, a towel and a skate care kit to help keep freshly sharpened edges clean and dry.": ["Använd skydd, en handduk och ett skridskovårdskit för att hålla nyslipade kanter rena och torra.", "Utilisez des protège-lames, une serviette et un kit d’entretien pour garder les carres fraîchement affûtées propres et sèches.", "Verwende Schoner, ein Handtuch und ein Pflege-Set, damit frisch geschliffene Kanten sauber und trocken bleiben."]
        ,"Browse skate accessories →": ["Se skridskotillbehör →", "Voir les accessoires de patins →", "Schlittschuhzubehör ansehen →"]
        ,"For many players, the stick reaches around the chin while wearing skates. Forwards may choose slightly shorter for control, while defense players often prefer extra reach.": ["För många spelare når klubban ungefär till hakan med skridskor på. Forwards kan välja något kortare för bättre kontroll, medan backar ofta föredrar extra räckvidd.", "Pour beaucoup de joueurs, la crosse arrive près du menton avec les patins. Les attaquants peuvent choisir légèrement plus court pour le contrôle, tandis que les défenseurs préfèrent souvent plus de portée.", "Für viele Spieler reicht der Schläger mit Schlittschuhen etwa bis zum Kinn. Stürmer wählen für mehr Kontrolle oft eine kürzere Länge, während Verteidiger zusätzliche Reichweite bevorzugen."]
        ,"5/8 inch is a friendly starting point for many players. Move to 1/2 for more grip or 3/4 for more glide after testing how your edges feel.": ["5/8 tum (16 mm) är en bra startpunkt för många spelare. Gå till 1/2 tum (13 mm) för mer grepp eller 3/4 tum (19 mm) för mer glid efter att du testat hur kanterna känns.", "5/8 pouce (16 mm) est un bon point de départ pour beaucoup de joueurs. Passez à 1/2 pouce (13 mm) pour plus d’accroche ou à 3/4 pouce (19 mm) pour plus de glisse après avoir testé vos sensations.", "5/8 Zoll (16 mm) ist für viele Spieler ein guter Ausgangspunkt. Wechsle zu 1/2 Zoll (13 mm) für mehr Grip oder 3/4 Zoll (19 mm) für mehr Gleiten, nachdem du das Kantengefühl getestet hast."]
        ,"There is no universal best hollow. The right choice depends on weight, skill, ice conditions and whether you prefer bite or glide.": ["Det finns ingen bästa skålradie för alla. Rätt val beror på vikt, nivå, isförhållanden och om du föredrar bett eller glid.", "Il n’existe pas de rayon idéal pour tous. Le bon choix dépend du poids, du niveau, de la glace et de votre préférence entre accroche et glisse.", "Es gibt keinen besten Hohlschliff für alle. Die richtige Wahl hängt von Gewicht, Niveau, Eisbedingungen und deiner Vorliebe für Biss oder Gleiten ab."]
        ,"1/2 is deeper and usually gives more edge grip. 5/8 is shallower and usually balances grip with smoother glide.": ["1/2 är djupare och ger vanligtvis bättre kantgrepp. 5/8 är grundare och balanserar oftast grepp med mjukare glid.", "1/2 est plus profond et offre généralement plus d’accroche. 5/8 est moins profond et équilibre généralement accroche et glisse.", "1/2 ist tiefer und bietet meist mehr Kantengriff. 5/8 ist flacher und verbindet Grip meist mit ruhigerem Gleiten."]
        ,"Both favor glide and less drag. 7/8 is the more glide-first option, while 3/4 keeps a little more bite.": ["Båda prioriterar glid och mindre motstånd. 7/8 är det mer glidorienterade valet, medan 3/4 behåller lite mer bett.", "Les deux privilégient la glisse et réduisent la résistance. 7/8 est le choix le plus orienté glisse, tandis que 3/4 garde davantage d’accroche.", "Beide fördern Gleiten und weniger Widerstand. 7/8 ist die stärker gleitorientierte Option, während 3/4 etwas mehr Biss behält."]
        ,"Many players sharpen every 10–20 hours on the ice, or sooner after damaged edges or dirty ice.": ["Många spelare slipar var 10–20:e istimme, eller tidigare efter skadade kanter eller smutsig is.", "Beaucoup de joueurs font affûter leurs patins toutes les 10 à 20 heures de glace, ou plus tôt après des carres endommagées ou de la glace sale.", "Viele Spieler lassen ihre Schlittschuhe alle 10–20 Eisstunden schleifen, bei beschädigten Kanten oder schmutzigem Eis früher."]
      },

    profiling: {
      "Pro shop sharpening": ["Proffshopens slipning", "Affûtage en pro shop", "Pro-Shop-Schliff"],
      "Skate Profiling": ["Skridsko profilering", "Profilage des patins", "Schlittschuhprofilierung"],
      "The profile is the curve between the two cutting edges. It changes bite, glide, turn feel and how stable the skates feel on different ice conditions.": ["Profilen är kurvan mellan de två skärande kanterna. Den påverkar grepp, glid, känsla i svängar och hur stabila skridskorna känns på olika isförhållanden.", "Le profil est la courbe entre les deux arêtes de coupe. Il change l’accroche, la glisse, la sensation en virage et la stabilité des patins selon les conditions de glace.", "Das Profil ist die Kurve zwischen den beiden Schneidkanten. Es beeinflusst Biss, Gleiten, Kurvengefühl und wie stabil die Schlittschuhe auf verschiedenen Eisbedingungen wirken."],
      "Choose the profile that matches your game.": ["Välj den profil som passar ditt spel.", "Choisissez le profil qui correspond à votre jeu.", "Wähle das Profil, das zu deinem Spiel passt."],
      "A deeper hollow gives more grip and a stronger bite in the ice. A shallower profile gives more glide and a faster feel. Most pro shops start from your weight, skill level, ice surface and whether you want more control or more speed.": ["En djupare profil ger mer grepp och ett starkare bett i isen. En grundare profil ger mer glid och en snabbare känsla. De flesta proffshoppar utgår från vikt, nivå, isförhållanden och om du vill ha mer kontroll eller mer fart.", "Un profil plus profond offre plus d’accroche et un meilleur mordant dans la glace. Un profil plus léger donne plus de glisse et une sensation plus rapide. La plupart des pro shops partent de votre poids, votre niveau, la surface de glace et du fait que vous vouliez plus de contrôle ou plus de vitesse.", "Ein tieferes Profil sorgt für mehr Grip und mehr Biss im Eis. Ein flacheres Profil liefert mehr Gleiten und ein schnelleres Gefühl. Die meisten Profi-Shops starten mit deinem Gewicht, deinem Niveau, der Eislage und der Frage, ob du mehr Kontrolle oder mehr Tempo willst."],
      "Good skating is often a balance: enough bite for turns and stops, without making the skates feel sticky or heavy. That is why the best profile is rarely one-size-fits-all.": ["Bra skridskoåkning handlar ofta om balans: tillräckligt grepp för svängar och stopp utan att skridskorna känns klibbiga eller tunga. Därför är den bästa profilen sällan en storleksmodell för alla.", "Le bon patinage est souvent un équilibre : assez d’accroche pour les virages et les arrêts, sans que les patins ne se sentent collants ou lourds. C’est pourquoi le meilleur profil est rarement universel.", "Gutes Schlittschuhlaufen ist oft ein Gleichgewicht: genug Biss für Kurven und Stops, ohne dass die Schlittschuhe klebrig oder schwer wirken. Deshalb passt das beste Profil selten für alle gleich."],
      "Use the sharpening guide →": ["Använd slipguiden →", "Utilisez le guide d’affûtage →", "Nutze den Schliff-Leitfaden →"],
      "Check your flex →": ["Kontrollera din flex →", "Vérifiez votre flex →", "Prüfe deinen Flex →"],
      "Most common pro shop profiles": ["Vanliga proffshopprofiler", "Profils de lame les plus courants chez les pro shops", "Die häufigsten Profi-Shop-Profile"],
      "Deep bite": ["Djupare grepp", "Accroche profonde", "Tiefer Biss"],
      "1/2 inch profile": ["1/2 tum profil", "Profil 1/2 po", "Profil 1/2 Zoll"],
      "More bite, more control and a stronger feel in tight turns. Best for players who want more grip on hard ice or a more aggressive first step.": ["Mer grepp, mer kontroll och starkare känsla i snäva svängar. Bäst för spelare som vill ha mer grepp på hård is eller ett mer aggressivt första steg.", "Plus d’accroche, plus de contrôle et une sensation plus nette dans les virages serrés. Idéal pour les joueurs qui veulent plus de mordant sur glace dure ou un premier pas plus agressif.", "Mehr Biss, mehr Kontrolle und ein stärkeres Gefühl in engen Kurven. Ideal für Spieler, die auf hartem Eis mehr Grip oder einen aggressiveren ersten Schritt wollen."],
      "Great for heavier players or hard-ice conditions": ["Bra för tyngre spelare eller hård is", "Idéal pour les joueurs lourds ou les glaces dures", "Gut für schwerere Spieler oder hartes Eis"],
      "Feels more locked in during stops and pivots": ["Känns mer låst under stopp och pivoter", "Se sent plus fermement bloqué lors des arrêts et pivots", "Fühlt sich bei Stops und Pivots stabiler an"],
      "Can feel slower and heavier in longer glide": ["Kan kännas långsammare och tyngre vid längre glid", "Peut sembler plus lent et plus lourd lors d’une longue glisse", "Kann bei längerem Gleiten langsamer und schwerer wirken"],
      "Balanced": ["Balanserad", "Équilibré", "Ausgewogen"],
      "5/8 inch profile": ["5/8 tum profil", "Profil 5/8 po", "Profil 5/8 Zoll"],
      "Often the best all-round starting point for recreational and competitive players. It keeps the blade stable without being too grabby.": ["Ofta den bästa allroundstarten för motions- och tävlingsspelare. Den håller skenan stabil utan att kännas för taggig.", "Souvent le meilleur point de départ pour les joueurs loisirs et compétitifs. Il garde la lame stable sans être trop mordant.", "Oft der beste Allround-Ausgangspunkt für Freizeit- und Leistungsspieler. Er sorgt für eine stabile Kufe, ohne zu bissig zu sein."],
      "Good for everyday skating and mixed ice": ["Bra för vardagsåkning och blandad is", "Idéal pour le patinage quotidien et la glace mixte", "Gut für den Alltag und gemischtes Eis"],
      "Offers a smooth blend of grip and glide": ["Ger en jämn blandning av grepp och glid", "Offre un mélange fluide d’accroche et de glisse", "Bietet eine sanfte Mischung aus Grip und Gleiten"],
      "One of the most common pro shop recommendations": ["Ett av de vanligaste rekommendationerna i proffshoppar", "Une des recommandations les plus courantes en pro shop", "Eine der häufigsten Empfehlungen in Profi-Shops"],
      "Speed": ["Fart", "Vitesse", "Tempo"],
      "3/4 inch profile": ["3/4 tum profil", "Profil 3/4 po", "Profil 3/4 Zoll"],
      "Shallower groove, less drag and more glide. This profile is popular when a skater wants a faster, lighter feel and good top-end speed.": ["Grundare profil, mindre motstånd och mer glid. Den här profilen är populär när spelaren vill ha snabbare, lättare känsla och bra toppfart.", "Rainure plus peu profonde, moins de traînée et plus de glisse. Ce profil est populaire quand le patineur veut une sensation plus rapide et plus légère avec un bon rythme en fin de poussée.", "Flachere Rille, weniger Widerstand und mehr Gleiten. Dieses Profil ist beliebt, wenn ein Skater ein schnelleres, leichteres Gefühl und gutes Top-Tempo will."],
      "Great for smooth ice and quicker transitions": ["Bra för jämn is och snabbare övergångar", "Idéal pour la glace lisse et les transitions rapides", "Gut für glattes Eis und schnelle Übergänge"],
      "Good for players who prioritize glide": ["Bra för spelare som prioriterar glid", "Idéal pour les joueurs qui privilégient la glisse", "Gut für Spieler, die mehr Gleiten wollen"],
      "Less bite in tight pivots and sudden stops": ["Mindre grepp i snabba pivoter och hårda stopp", "Moins d’accroche en pivots serrés et arrêts soudains", "Weniger Biss bei engen Pivots und abrupten Stops"],
      "Maximum glide": ["Maximal glid", "Glisse maximale", "Maximales Gleiten"],
      "7/8 inch profile": ["7/8 tum profil", "Profil 7/8 po", "Profil 7/8 Zoll"],
      "Very shallow and very fast. This profile suits players who want easy speed and less drag, but it asks for solid edge control and confident turns.": ["Mycket grund och mycket snabb. Den här profilen passar spelare som vill ha lätt fart och mindre motstånd, men den kräver god kantkontroll och säkra svängar.", "Très peu profond et très rapide. Ce profil convient aux joueurs qui recherchent de la vitesse sans traînée, mais il demande un bon contrôle des arêtes et des virages sûrs.", "Sehr flach und sehr schnell. Dieses Profil eignet sich für Spieler, die leichtes Tempo und wenig Widerstand wollen, aber gute Kantenkontrolle und sichere Kurven brauchen."],
      "Best for speed-focused skaters": ["Bäst för fartinriktade spelare", "Idéal pour les patineurs orientés vitesse", "Ideal für geschwindigkeitsorientierte Skater"],
      "Very low drag and easy acceleration": ["Mycket lågt motstånd och lätt acceleration", "Très faible traînée et accélération facile", "Sehr geringer Widerstand und leichte Beschleunigung"],
      "Requires good edge feel and technique": ["Kräver god kantkänsla och teknik", "Nécessite un bon ressenti des arêtes et de la technique", "Benötigt gutes Kantengefühl und Technik"],
      "What pro shops often recommend": ["Det proffshoppar ofta rekommenderar", "Ce que les pro shops recommandent souvent", "Was Profi-Shops oft empfehlen"],
      "How to choose between the common profiles": ["Hur du väljer mellan de vanligaste profilerna", "Comment choisir entre les profils courants", "Wie du zwischen den häufigsten Profilen wählst"],
      "Beginner": ["Nybörjare", "Débutant", "Anfänger"],
      "Control": ["Kontroll", "Contrôle", "Kontrolle"],
      "All-round": ["Allround", "Tout terrain", "Allround"],
      "Hard ice → more bite": ["Hård is → mer grepp", "Glace dure → plus d’accroche", "Hartes Eis → mehr Biss"],
      "Soft ice → more glide": ["Mjuk is → mer glid", "Glace douce → plus de glisse", "Weiches Eis → mehr Gleiten"],
      "Heavier skater → often deeper": ["Tyngre spelare → ofta djupare", "Patineur plus lourd → souvent plus profond", "Schwererer Skater → oft tiefer"],
      "Faster skater → often shallower": ["Snabbare spelare → ofta grundare", "Patineur plus rapide → souvent plus léger", "Schnellerer Skater → oft flacher"],
      "The pro shop way": ["Proffshopens sätt", "La méthode du pro shop", "Der Profi-Shop-Weg"],
      "Make the profile work with the player.": ["Se till att profilen passar spelaren.", "Faites en sorte que le profil convienne au patineur.", "Passe das Profil an den Spieler an."],
      "Pro shops rarely choose a profile by brand or marketing alone. They look at blade condition, ice type, player weight and whether the skater wants more grip for stops and turns or more glide for speed and clean edges.": ["Proffshoppar väljer sällan profil enbart efter märke eller marknadsföring. De tittar på skenans skick, istyp, spelarens vikt och om skridskoåkaren vill ha mer grepp i stopp och svängar eller mer glid för fart och rena kanter.", "Les pro shops choisissent rarement un profil uniquement selon la marque ou le marketing. Ils regardent l’état de la lame, le type de glace, le poids du patineur et s’il veut plus d’accroche pour les arrêts et virages ou plus de glisse pour la vitesse et les arêtes nettes.", "Profi-Shops wählen ein Profil selten nur nach Marke oder Marketing. Sie prüfen den Zustand der Kufe, den Eistyp, das Gewicht des Skaters und ob mehr Grip für Stops und Kurven oder mehr Gleiten für Tempo und saubere Kanten gewünscht wird."],
      "Ice conditions:": ["Isförhållanden:", "Conditions de glace :", "Eisbedingungen:"],
      "hard and fast ice usually favors a deeper profile; softer ice often rewards a shallower one.": ["hård och snabb is gynnar oftast en djupare profil; mjuk is gynnar ofta en grundare profil.", "la glace dure et rapide favorise généralement un profil plus profond ; une glace plus douce récompense souvent un profil plus peu profond.", "hartes und schnelles Eis begünstigt meist ein tieferes Profil; weicheres Eis belohnt oft ein flacheres."],
      "Skating style:": ["Skridskoåkning:", "Style de patinage :", "Skating-Stil:"],
      "quick, agile players often like a little more bite; smooth and fast skaters may prefer a shallower, faster profile.": ["snabba och rörliga spelare gillar ofta lite mer grepp; jämna och snabba spelare föredrar ofta en grundare och snabbare profil.", "les joueurs rapides et agiles apprécient souvent un peu plus d’accroche ; les patineurs fluides et rapides peuvent préférer un profil plus léger et plus rapide.", "schnelle und agile Spieler mögen oft etwas mehr Biss; smooth und schnelle Skater bevorzugen oft ein flacheres, schnelleres Profil."],
      "Blade condition:": ["Skenans skick:", "État de la lame :", "Zustand der Kufe:"],
      "a worn or uneven blade should be profiled and checked before changing the hollow dramatically.": ["en sliten eller ojämn skena bör profileras och kontrolleras innan du ändrar skålradien mycket.", "une lame usée ou irrégulière doit être profilée et vérifiée avant de modifier le profil de manière importante.", "Eine abgenutzte oder unebene Kufe sollte vor einer größeren Änderung profiliert und geprüft werden."],
      "Next step": ["Nästa steg", "Étape suivante", "Nächster Schritt"],
      "Use the correct profile": ["Använd rätt profil", "Utilisez le bon profil", "Nutze das richtige Profil"],
      "Start with a standard profile, then test one step deeper or shallower for feel. Small changes often matter more than chasing the “perfect” number.": ["Börja med en standardprofil och testa sedan ett steg djupare eller grundare för känsla. Små ändringar betyder ofta mer än att jaga ett “perfekt” tal.", "Commencez par un profil standard, puis testez un cran plus profond ou plus léger selon le ressenti. De petits changements comptent souvent plus que de chercher le « nombre parfait ».", "Starte mit einem Standardprofil und teste dann ein Stück tiefer oder flacher nach Gefühl. Kleine Änderungen zählen oft mehr als das Jagen nach der „perfekten“ Zahl."],
      "Read the full sharpening guide →": ["Läs hela slipguiden →", "Lire le guide d’affûtage complet →", "Lies den kompletten Schliff-Leitfaden →"]
    }
  };

  // The Nordic copy is kept separate so the existing language arrays remain
  // byte-for-byte compatible with the original English, Swedish, French and
  // German translations.
  const nordicPages = {
    no: {
      home: {
        "Simple tools for better hockey gear decisions": "Enkle verktøy for bedre hockeyutstyr",
        "Choose hockey gear with confidence.": "Velg hockeyutstyr med trygghet.",
        "Free, practical calculators and guides for players, parents and coaches. Get a useful starting point in under a minute.": "Gratis, praktiske kalkulatorer og guider for spillere, foreldre og trenere. Få et nyttig utgangspunkt på under ett minutt.",
        "Start with stick flex": "Start med kølleflex",
        "Three free tools": "Tre gratis verktøy", "Build a better setup": "Bygg et bedre oppsett",
        "Made for every bench": "For alle spillere", "Useful advice, not gear jargon.": "Nyttige råd, uten utstyrsjargon.",
        "Every result is a starting point. Comfort, confidence and ice time matter more than a perfect number. Test small changes and ask a qualified skate sharpener or coach when in doubt.": "Hvert resultat er et utgangspunkt. Komfort, trygghet og tid på isen er viktigere enn et perfekt tall. Test små endringer, og spør en kvalifisert skøytesliper eller trener hvis du er usikker.",
        "Youth players": "Ungdomsspillere", "Adult recreational players": "Voksne mosjonsspillere",
        "Competitive players": "Konkurransespillere", "Parents": "Foreldre", "Hockey coaches": "Hockeytrenere",
        "Find a practical starting flex based on weight, position and playing style.": "Finn en praktisk startflex basert på vekt, posisjon og spillestil.",
        "Learn where your stick should reach in skates and in shoes.": "Lær hvor høyt køllen bør nå med skøyter og sko.",
        "Choose a starting hollow for grip, glide, weight and ice conditions.": "Velg en startslipeprofil ut fra grep, glid, vekt og isforhold.",
        "Hockey Stick Flex Calculator": "Kalkulator for hockeykølleflex",
        "Hockey Stick Length Calculator": "Kalkulator for hockeykøllelengde",
        "Skate Sharpening Guide": "Guide til skøytesliping", "Calculate flex →": "Beregn flex →",
        "Find stick length →": "Finn køllelengde →", "Choose a hollow →": "Velg slipeprofil →"
      },
      flex: {
        "Free hockey equipment calculator": "Gratis kalkulator for hockeyutstyr",
        "Hockey Stick Flex Calculator": "Kalkulator for hockeykølleflex",
        "Wondering what flex hockey stick you should use? Enter your details to get a recommended flex, practical range and an explanation you can use when shopping.": "Lurer du på hvilken flex du bør bruke? Skriv inn opplysningene dine for å få anbefalt flex, et praktisk intervall og en forklaring du kan bruke når du handler.",
        "Find your starting point": "Finn utgangspunktet ditt", "What flex hockey stick should I use?": "Hvilken flex bør jeg bruke?",
        "Stick flex describes how much a shaft bends under load. The right flex helps you load shots without sacrificing accuracy, puck control or comfort. This hockey stick flex calculator combines the traditional weight-based rule with height, age group, skill level and playing style.": "Kølleflex beskriver hvor mye skaftet bøyer seg under belastning. Riktig flex gjør det lettere å lade skudd uten å ofre presisjon, puckkontroll eller komfort. Kalkulatoren kombinerer den tradisjonelle vektregelen med høyde, aldersgruppe, ferdighetsnivå og spillestil.",
        "Results are a starting recommendation, not a strict rule. Try a nearby flex when possible, especially if you cut the stick shorter or are between age categories.": "Resultatet er en anbefaling, ikke en fast regel. Prøv gjerne en nærliggende flex, særlig hvis du kapper køllen eller er mellom aldersgrupper.",
        "Personalized recommendation": "Personlig anbefaling", "Calculate your stick flex": "Beregn kølleflexen din",
        "Calculate recommended flex": "Beregn anbefalt flex", "Your recommendation": "Din anbefaling", "Flex range:": "Flexintervall:",
        "Enter your details to see your personalized explanation.": "Skriv inn opplysningene dine for å se din personlige forklaring.",
        "Test the recommended flex and one step above or below. Cutting a stick shorter makes it feel stiffer.": "Test anbefalt flex og ett trinn over eller under. En kortere kølle føles stivere.",
        "Quick reference": "Hurtigreferanse", "Common hockey stick flex recommendations": "Vanlige anbefalinger for hockeykølleflex",
        "Use these broad ranges as a youth hockey stick flex chart and senior hockey stick flex chart. Player strength and final stick height can move the best choice.": "Bruk disse brede intervallene som oversikt for ungdoms- og seniorkøller. Spillerens styrke og køllens endelige lengde kan påvirke valget.",
        "Player group": "Spillergruppe", "Typical weight": "Typisk vekt", "Common flex": "Vanlig flex", "Best starting point": "Beste utgangspunkt",
        "Easy to load": "Lett å belaste", "Balanced control": "Balansert kontroll", "Comfort and release": "Komfort og skudd", "Load and stability": "Belastning og stabilitet", "Strength and power": "Styrke og kraft",
        "Understand your result": "Forstå resultatet", "How to choose the best hockey stick flex": "Slik velger du riktig hockeykølleflex",
        "Three flex adjustments that matter": "Tre viktige flexjusteringer", "Stick height:": "Køllelengde:", "Skill level:": "Ferdighetsnivå:", "Playing style:": "Spillestil:",
        "Check your stick length →": "Sjekk køllelengden →", "Read the skate sharpening guide →": "Les guiden til skøytesliping →",
        "Shop smarter": "Handle smartere", "Compare sticks by flex": "Sammenlign køller etter flex", "Browse hockey sticks →": "Se hockeykøller →", "Common questions": "Vanlige spørsmål", "Hockey stick flex FAQ": "Vanlige spørsmål om hockeykølleflex",
        "What is the best hockey stick flex?": "Hva er den beste hockeykølleflexen?", "What flex should a youth hockey player use?": "Hvilken flex bør en ungdomsspiller bruke?", "Does stick height change flex?": "Påvirker køllelengden flexen?", "Can I use this as a senior hockey stick flex chart?": "Kan jeg bruke dette som flexoversikt for seniorkøller?"
      },
      length: {
        "Free hockey equipment calculator": "Gratis kalkulator for hockeyutstyr", "Hockey Stick Length Calculator": "Kalkulator for hockeykøllelengde",
        "Find the correct hockey stick length for your height, skates, age group and playing position.": "Finn riktig hockeykøllelengde ut fra høyde, skøyter, aldersgruppe og posisjon.",
        "Choose the right size": "Velg riktig størrelse", "How long should my hockey stick be?": "Hvor lang bør hockeykøllen være?",
        "Personalized recommendation": "Personlig anbefaling", "Calculate your stick length": "Beregn køllelengden din", "Player height": "Spillerens høyde",
        "Enter height in centimetres.": "Skriv inn høyden i centimeter.", "Calculate stick length": "Beregn køllelengde", "Recommended stick length": "Anbefalt køllelengde", "Acceptable range:": "Akseptabelt intervall:",
        "With skates on, many players prefer the top near the chin. Always check blade contact and stance before cutting.": "Med skøyter på foretrekker mange at toppen når nær haken. Sjekk at køllebladet har kontakt med isen og at du står naturlig før du kapper.",
        "Hockey stick sizing chart": "Størrelsestabell for hockeykøller", "Category": "Kategori", "Typical height": "Typisk høyde", "Stick class": "Kølleklasse", "Approx. length": "Omtrentlig lengde",
        "Defense preference": "Backpreferanse", "Any category": "Alle kategorier", "Same class": "Samme klasse", "Add about 1–2 in": "Legg til omtrent 2–5 cm", "Buying guide": "Kjøpsguide",
        "How to choose the correct hockey stick length": "Slik velger du riktig hockeykøllelengde", "Hockey stick length buying tips": "Kjøpstips for hockeykøller",
        "Check the blade:": "Sjekk bladet:", "Position is a preference:": "Posisjon er en preferanse:", "Calculate your stick flex →": "Beregn kølleflex →", "Find sticks by size": "Finn køller etter størrelse",
        "Hockey stick length FAQ": "Vanlige spørsmål om hockeykøllelengde", "Should a hockey stick reach my chin or nose?": "Bør hockeykøllen nå haken eller nesen?",
        "Do defense players need a longer stick?": "Trenger backer en lengre kølle?", "What size hockey stick does a youth player need?": "Hvilken størrelse hockeykølle trenger en ungdomsspiller?", "Can I cut a hockey stick shorter?": "Kan jeg kappe en hockeykølle kortere?"
      },
      sharpening: {
        "Free hockey equipment guide": "Gratis guide til hockeyutstyr", "Hockey Skate Sharpening Guide": "Guide til skøytesliping",
        "Find a standard starting hollow for grip and glide, then learn what to try next when your edges do not feel right.": "Finn en standard slipeprofil for grep og glid, og lær hva du kan prøve når kantene ikke føles riktige.",
        "Choose your hollow": "Velg slipeprofil", "What hollow should I use?": "Hvilken slipeprofil bør jeg bruke?",
        "The hollow is the curved groove cut between the two edges of a skate blade. A smaller number, such as 1/2 inch, cuts a deeper groove and usually gives more grip. A larger number, such as 3/4 inch, gives a shallower groove and usually more glide.": "Slipeprofilen er den buede rillen mellom skøytejernets to kanter. Et lavere tall, som 1/2 tomme, lager en dypere rille og gir vanligvis mer grep. Et høyere tall, som 3/4 tomme, lager en grunnere rille og gir vanligvis mer glid.",
        "There is no single best hockey skate hollow. This calculator gives you a sensible starting point using weight, skill, ice and preference. Your sharpener, skating technique and actual feel should make the final decision.": "Det finnes ikke en eneste beste slipeprofil for hockeyskøyter. Denne kalkulatoren gir deg et fornuftig utgangspunkt basert på vekt, ferdighet, is og preferanse. Din skøytesliper, teknikk og faktisk følelse bør avgjøre det endelige valget.",
        "Find your starting hollow": "Finn din startslipeprofil", "Find my hollow": "Finn min slipeprofil", "Recommended hollow radius": "Anbefalt sliperadius", "Alternative options:": "Alternative valg:",
        "Skate sharpening chart": "Tabell for skøytesliping", "These are general starting points. Weight, technique and ice temperature can change how each radius feels.": "Dette er generelle utgangspunkter. Vekt, teknikk og istemperatur kan endre hvordan hver radius føles.",
        "Hollow": "Slipeprofil", "Feel": "Følelse", "Good for": "Passer for", "Trade-off": "Ulempe", "Compare your options": "Sammenlign alternativene dine",
        "Radius comparison: grip vs glide": "Radii sammenlignet: grep mot glid", "Radius": "Radius", "Edge bite": "Kantgrep", "Glide": "Glid", "Beginner note": "Nybegynnertips",
        "Beginner guide": "Nybegynnerguide", "How to adjust your sharpening": "Slik justerer du slipingen", "If your skates slip during stops or turns, try a smaller hollow for more bite. If your legs feel tired, your skates feel stuck to the ice or you want easier speed, try a larger hollow for more glide.": "Hvis skøytene glir i stopp eller svinger, prøv en mindre slipeprofil for mer bitt. Hvis beina blir trøtte, skøytene føles fast på isen, eller du vil ha enklere fart, prøv en større slipeprofil for mer glid.",
        "5/8 vs 1/2 skate sharpening": "5/8 vs 1/2 skøytesliping", "The difference is simple: 1/2 inch is deeper and more aggressive, while 5/8 inch is shallower and more forgiving. Start at 5/8 unless you know you need extra grip, then test 1/2 if you are sliding out on hard ice.": "Forskjellen er enkel: 1/2 tomme er dypere og mer aggressiv, mens 5/8 tomme er grunnere og mer tilgivende. Start på 5/8 med mindre du vet at du trenger ekstra grep, og prøv deretter 1/2 hvis du glir ut på hard is.",
        "Calculate your stick flex →": "Beregn kølleflexen din →", "Find your stick length →": "Finn køllelengden din →",
        "Protect your edges": "Beskytt kantene", "Shop skate care essentials": "Kjøp utstyr til skøytepleie", "Browse skate accessories →": "Se skøyteutstyr →", "Hockey skate sharpening FAQ": "Vanlige spørsmål om skøytesliping",
        "What hollow should I use for hockey skates?": "Hvilken slipeprofil bør jeg bruke på hockeyskøyter?", "What is the best hockey skate hollow?": "Hva er den beste slipeprofilen for hockeyskøyter?",
        "What is the difference between 5/8 and 1/2 skate sharpening?": "Hva er forskjellen på 5/8 og 1/2 skøytesliping?", "How do I choose between 3/4 and 7/8?": "Hvordan velger jeg mellom 3/4 og 7/8?", "How often should hockey skates be sharpened?": "Hvor ofte bør hockeyskøyter slipes?"
      }
    },
    da: {
      home: {
        "Simple tools for better hockey gear decisions": "Enkle værktøjer til bedre hockeyudstyr",
        "Choose hockey gear with confidence.": "Vælg hockeyudstyr med tillid.",
        "Free, practical calculators and guides for players, parents and coaches. Get a useful starting point in under a minute.": "Gratis, praktiske beregnere og guides til spillere, forældre og trænere. Få et nyttigt udgangspunkt på under et minut.",
        "Start with stick flex": "Start med stavflex", "Three free tools": "Tre gratis værktøjer", "Build a better setup": "Skab et bedre setup",
        "Made for every bench": "Til alle spillere", "Useful advice, not gear jargon.": "Nyttige råd uden udstyrsjargon.",
        "Every result is a starting point. Comfort, confidence and ice time matter more than a perfect number. Test small changes and ask a qualified skate sharpener or coach when in doubt.": "Hvert resultat er et udgangspunkt. Komfort, selvtillid og tid på isen betyder mere end et perfekt tal. Afprøv små ændringer, og spørg en kvalificeret skøjtesliber eller træner, hvis du er i tvivl.",
        "Youth players": "Ungdomsspillere", "Adult recreational players": "Voksne motionsspillere", "Competitive players": "Konkurrencespillere",
        "Parents": "Forældre", "Hockey coaches": "Hockeytrænere", "Calculate flex →": "Beregn flex →", "Find stick length →": "Find stavlængde →", "Choose a hollow →": "Vælg sliberadius →",
        "Hockey Stick Flex Calculator": "Beregner til hockeystavens flex", "Hockey Stick Length Calculator": "Beregner til hockeystavens længde", "Skate Sharpening Guide": "Guide til skøjteslibning"
      },
      flex: {
        "Free hockey equipment calculator": "Gratis beregner til hockeyudstyr", "Hockey Stick Flex Calculator": "Beregner til hockeystavens flex",
        "Wondering what flex hockey stick you should use? Enter your details to get a recommended flex, practical range and an explanation you can use when shopping.": "Er du i tvivl om hvilken flex du skal bruge? Indtast dine oplysninger for at få en anbefalet flex, et praktisk interval og en forklaring til indkøb.",
        "Find your starting point": "Find dit udgangspunkt", "What flex hockey stick should I use?": "Hvilken flex skal jeg bruge?", "Personalized recommendation": "Personlig anbefaling",
        "Calculate your stick flex": "Beregn din stavflex", "Calculate recommended flex": "Beregn anbefalet flex", "Your recommendation": "Din anbefaling", "Flex range:": "Flexinterval:",
        "Enter your details to see your personalized explanation.": "Indtast dine oplysninger for at se din personlige forklaring.", "Quick reference": "Hurtig reference",
        "Common hockey stick flex recommendations": "Almindelige anbefalinger til hockeystavens flex", "Player group": "Spillergruppe", "Typical weight": "Typisk vægt",
        "Common flex": "Almindelig flex", "Best starting point": "Bedste udgangspunkt", "Easy to load": "Let at belaste", "Balanced control": "Balanceret kontrol",
        "Understand your result": "Forstå dit resultat", "How to choose the best hockey stick flex": "Sådan vælger du den rigtige hockeystavflex",
        "Three flex adjustments that matter": "Tre vigtige flexjusteringer", "Stick height:": "Stavlængde:", "Skill level:": "Færdighedsniveau:", "Playing style:": "Spillestil:",
        "Shop smarter": "Shop smartere", "Compare sticks by flex": "Sammenlign stave efter flex", "Browse hockey sticks →": "Se hockey stave →", "Common questions": "Ofte stillede spørgsmål", "Hockey stick flex FAQ": "FAQ om hockeystavens flex",
        "What is the best hockey stick flex?": "Hvad er den bedste hockeystavflex?", "What flex should a youth hockey player use?": "Hvilken flex skal en ungdomsspiller bruge?", "Does stick height change flex?": "Ændrer stavlængden flex?", "Can I use this as a senior hockey stick flex chart?": "Kan jeg bruge dette som flexoversigt for seniorstave?"
      },
      length: {
        "Free hockey equipment calculator": "Gratis beregner til hockeyudstyr", "Hockey Stick Length Calculator": "Beregner til hockeystavens længde",
        "Find the correct hockey stick length for your height, skates, age group and playing position.": "Find den rigtige hockeystavlængde ud fra højde, skøjter, aldersgruppe og position.",
        "Choose the right size": "Vælg den rigtige størrelse", "How long should my hockey stick be?": "Hvor lang skal min hockeystav være?",
        "Personalized recommendation": "Personlig anbefaling", "Calculate your stick length": "Beregn din stavlængde", "Player height": "Spillerens højde",
        "Enter height in centimetres.": "Indtast højden i centimeter.", "Calculate stick length": "Beregn stavlængde", "Recommended stick length": "Anbefalet stavlængde", "Acceptable range:": "Acceptabelt interval:",
        "Hockey stick sizing chart": "Størrelsestabel for hockeystave", "Category": "Kategori", "Typical height": "Typisk højde", "Stick class": "Stavklasse", "Approx. length": "Omtrentlig længde",
        "Buying guide": "Købsvejledning", "How to choose the correct hockey stick length": "Sådan vælger du den rigtige hockeystavlængde", "Hockey stick length FAQ": "FAQ om hockeystavlængde",
        "Should a hockey stick reach my chin or nose?": "Skal hockeystaven nå min hage eller næse?", "Do defense players need a longer stick?": "Har forsvarsspillere brug for en længere stav?", "Can I cut a hockey stick shorter?": "Kan jeg afkorte en hockeystav?"
      },
      sharpening: {
        "Free hockey equipment guide": "Gratis guide til hockeyudstyr", "Hockey Skate Sharpening Guide": "Guide til skøjteslibning",
        "Find a standard starting hollow for grip and glide, then learn what to try next when your edges do not feel right.": "Find en standard sliberadius til greb og glid, og lær hvad du kan prøve, når kanterne ikke føles rigtige.",
        "Choose your hollow": "Vælg sliberadius", "What hollow should I use?": "Hvilken sliberadius skal jeg bruge?",
        "The hollow is the curved groove cut between the two edges of a skate blade. A smaller number, such as 1/2 inch, cuts a deeper groove and usually gives more grip. A larger number, such as 3/4 inch, gives a shallower groove and usually more glide.": "Sliberadiusen er den buede rille mellem skøjteklingens to kanter. Et lavere tal, som 1/2 tomme, skaber en dybere rille og giver normalt mere greb. Et højere tal, som 3/4 tomme, skaber en lavere rille og giver normalt mere glid.",
        "There is no single best hockey skate hollow. This calculator gives you a sensible starting point using weight, skill, ice and preference. Your sharpener, skating technique and actual feel should make the final decision.": "Der er ikke en enkelt bedste sliberadius til hockeyskøjter. Denne beregner giver dig et fornuftigt udgangspunkt baseret på vægt, færdighed, is og præference. Din skøjteforhandler, teknik og faktiske følelse skal afgøre det endelige valg.",
        "Find your starting hollow": "Find din startsradius", "Find my hollow": "Find min sliberadius", "Recommended hollow radius": "Anbefalet sliberadius", "Alternative options:": "Alternative muligheder:",
        "Skate sharpening chart": "Tabel over skøjteslibning", "Hollow": "Sliberadius", "Feel": "Følelse", "Good for": "God til", "Trade-off": "Ulempe",
        "Compare your options": "Sammenlign dine muligheder", "Radius comparison: grip vs glide": "Sammenligning: greb mod glid", "Beginner guide": "Begynderguide",
        "How to adjust your sharpening": "Sådan justerer du slibningen", "If your skates slip during stops or turns, try a smaller hollow for more bite. If your legs feel tired, your skates feel stuck to the ice or you want easier speed, try a larger hollow for more glide.": "Hvis dine skøjter glider i stop eller sving, prøv en mindre sliberadius for mere greb. Hvis dine ben bliver trætte, føles skøjterne fast på isen, eller du vil have lettere fart, prøv en større sliberadius for mere glid.",
        "5/8 vs 1/2 skate sharpening": "5/8 vs 1/2 skøjteslibning", "The difference is simple: 1/2 inch is deeper and more aggressive, while 5/8 inch is shallower and more forgiving. Start at 5/8 unless you know you need extra grip, then test 1/2 if you are sliding out on hard ice.": "Forskellen er enkel: 1/2 tomme er dybere og mere aggressiv, mens 5/8 tomme er grundere og mere tilgivende. Start på 5/8, medmindre du ved, at du har brug for ekstra greb, og prøv derefter 1/2, hvis du glider ud på hård is.",
        "Calculate your stick flex →": "Beregn din stavflex →", "Find your stick length →": "Find din stavlængde →", "Protect your edges": "Beskyt kanterne", "Shop skate care essentials": "Køb udstyr til skøjtepleje",
        "Browse skate accessories →": "Se skøjteudstyr →", "Common questions": "Ofte stillede spørgsmål", "Hockey skate sharpening FAQ": "FAQ om skøjteslibning",
        "What hollow should I use for hockey skates?": "Hvilken sliberadius skal jeg bruge til hockeyskøjter?", "What is the best hockey skate hollow?": "Hvad er den bedste sliberadius til hockeyskøjter?",
        "What is the difference between 5/8 and 1/2 skate sharpening?": "Hvad er forskellen på 5/8 og 1/2 skøjteslibning?", "How do I choose between 3/4 and 7/8?": "Hvordan vælger jeg mellem 3/4 og 7/8?", "How often should hockey skates be sharpened?": "Hvor ofte skal hockeyskøjter slibes?"
      }
    },
    fi: {
      home: {
        "Simple tools for better hockey gear decisions": "Helppokäyttöiset työkalut parempiin kiekkovarustevalintoihin", "Choose hockey gear with confidence.": "Valitse kiekkovarusteet luottavaisin mielin.",
        "Free, practical calculators and guides for players, parents and coaches. Get a useful starting point in under a minute.": "Ilmaiset, käytännölliset laskurit ja oppaat pelaajille, vanhemmille ja valmentajille. Löydä hyvä lähtökohta alle minuutissa.",
        "Start with stick flex": "Aloita mailan flexistä", "Three free tools": "Kolme ilmaista työkalua", "Build a better setup": "Rakenna parempi varustus",
        "Made for every bench": "Kaikille pelaajille", "Useful advice, not gear jargon.": "Hyödyllisiä neuvoja ilman varustejargonia.",
        "Every result is a starting point. Comfort, confidence and ice time matter more than a perfect number. Test small changes and ask a qualified skate sharpener or coach when in doubt.": "Jokainen tulos on lähtökohta. Mukavuus, itseluottamus ja jäällä vietetty aika ovat tärkeämpiä kuin täydellinen luku. Kokeile pieniä muutoksia ja kysy tarvittaessa neuvoa pätevältä luistinten teroittajalta tai valmentajalta.",
        "Youth players": "Nuoret pelaajat", "Adult recreational players": "Aikuisharrastajat", "Competitive players": "Kilpapelaajat", "Parents": "Vanhemmat", "Hockey coaches": "Jääkiekkovalmentajat",
        "Calculate flex →": "Laske flex →", "Find stick length →": "Etsi mailan pituus →", "Choose a hollow →": "Valitse teroitusura →",
        "Hockey Stick Flex Calculator": "Jääkiekkomailan flexlaskuri", "Hockey Stick Length Calculator": "Jääkiekkomailan pituuslaskuri", "Skate Sharpening Guide": "Luistinten teroitusopas"
      },
      flex: {
        "Free hockey equipment calculator": "Ilmainen jääkiekkovarusteiden laskuri", "Hockey Stick Flex Calculator": "Jääkiekkomailan flexlaskuri",
        "Wondering what flex hockey stick you should use? Enter your details to get a recommended flex, practical range and an explanation you can use when shopping.": "Mietitkö, mikä flex sopii sinulle? Syötä tietosi saadaksesi suositellun flexin, sopivan vaihteluvälin ja selityksen ostoksia varten.",
        "Find your starting point": "Löydä lähtökohtasi", "What flex hockey stick should I use?": "Mitä mailan flexiä minun pitäisi käyttää?", "Personalized recommendation": "Henkilökohtainen suositus",
        "Calculate your stick flex": "Laske mailasi flex", "Calculate recommended flex": "Laske suositeltu flex", "Your recommendation": "Suosituksesi", "Flex range:": "Flexalue:",
        "Enter your details to see your personalized explanation.": "Syötä tietosi nähdäksesi henkilökohtaisen selityksen.", "Quick reference": "Pikaviite",
        "Common hockey stick flex recommendations": "Yleiset jääkiekkomailan flex-suositukset", "Player group": "Pelaajaryhmä", "Typical weight": "Tyypillinen paino",
        "Common flex": "Yleinen flex", "Best starting point": "Paras lähtökohta", "Easy to load": "Helppo ladata", "Balanced control": "Tasapainoinen hallinta",
        "Understand your result": "Ymmärrä tuloksesi", "How to choose the best hockey stick flex": "Näin valitset sopivan mailan flexin",
        "Three flex adjustments that matter": "Kolme tärkeää flex-säätöä", "Stick height:": "Mailan pituus:", "Skill level:": "Taitotaso:", "Playing style:": "Pelityyli:",
        "Shop smarter": "Osta viisaammin", "Compare sticks by flex": "Vertaile mailoja flexin mukaan", "Browse hockey sticks →": "Selaa jääkiekkomailoja →", "Common questions": "Usein kysyttyä", "Hockey stick flex FAQ": "Jääkiekkomailan flex – usein kysyttyä",
        "What is the best hockey stick flex?": "Mikä on paras jääkiekkomailan flex?", "What flex should a youth hockey player use?": "Mitä flexiä nuoren pelaajan tulisi käyttää?", "Does stick height change flex?": "Muuttuuko flex mailan pituuden myötä?", "Can I use this as a senior hockey stick flex chart?": "Voinko käyttää tätä seniorimailojen flex-taulukkona?"
      },
      length: {
        "Free hockey equipment calculator": "Ilmainen jääkiekkovarusteiden laskuri", "Hockey Stick Length Calculator": "Jääkiekkomailan pituuslaskuri",
        "Find the correct hockey stick length for your height, skates, age group and playing position.": "Löydä oikea mailan pituus pituutesi, luistinten, ikäryhmän ja pelipaikan perusteella.",
        "Choose the right size": "Valitse oikea koko", "How long should my hockey stick be?": "Kuinka pitkä jääkiekkomailan tulisi olla?",
        "Personalized recommendation": "Henkilökohtainen suositus", "Calculate your stick length": "Laske mailan pituus", "Player height": "Pelaajan pituus",
        "Enter height in centimetres.": "Syötä pituus senttimetreinä.", "Calculate stick length": "Laske mailan pituus", "Recommended stick length": "Suositeltu mailan pituus", "Acceptable range:": "Sopiva vaihteluväli:",
        "Hockey stick sizing chart": "Jääkiekkomailojen kokotaulukko", "Category": "Luokka", "Typical height": "Tyypillinen pituus", "Stick class": "Mailaluokka", "Approx. length": "Arvioitu pituus",
        "Buying guide": "Osto-opas", "How to choose the correct hockey stick length": "Näin valitset oikean mailan pituuden", "Hockey stick length FAQ": "Mailan pituus – usein kysyttyä",
        "Should a hockey stick reach my chin or nose?": "Pitäisikö mailan ulottua leukaan vai nenään?", "Do defense players need a longer stick?": "Tarvitsevatko puolustajat pidemmän mailan?", "Can I cut a hockey stick shorter?": "Voinko lyhentää jääkiekkomailaa?"
      },
      sharpening: {
        "Free hockey equipment guide": "Ilmainen jääkiekkovarusteiden opas", "Hockey Skate Sharpening Guide": "Luistinten teroitusopas",
        "Find a standard starting hollow for grip and glide, then learn what to try next when your edges do not feel right.": "Löydä tavallinen lähtöura pidolle ja liu'ulle ja opi, mitä kokeilla, kun terät eivät tunnu oikeilta.",
        "Choose your hollow": "Valitse teroitusura", "What hollow should I use?": "Mitä teroitusuraa minun pitäisi käyttää?",
        "The hollow is the curved groove cut between the two edges of a skate blade. A smaller number, such as 1/2 inch, cuts a deeper groove and usually gives more grip. A larger number, such as 3/4 inch, gives a shallower groove and usually more glide.": "Teroitusura on luistimen terän kahden reunan välinen kaareva ura. Pienempi luku, kuten 1/2 tuumaa, tekee syvemmän uran ja yleensä enemmän pitoa. Suurempi luku, kuten 3/4 tuumaa, tekee matalamman uran ja yleensä enemmän luistoa.",
        "There is no single best hockey skate hollow. This calculator gives you a sensible starting point using weight, skill, ice and preference. Your sharpener, skating technique and actual feel should make the final decision.": "Ei ole yhtä ainoaa parasta luistinten teroitusuraa. Tämä laskuri antaa sinulle järkevän lähtökohdan painon, taitojen, jään ja mieltymyksen perusteella. Teroittaja, luistelutekniikka ja todellinen tuntuma tekevät lopullisen päätöksen.",
        "Find your starting hollow": "Löydä lähtöurasi", "Find my hollow": "Etsi teroitusurani", "Recommended hollow radius": "Suositeltu teroitussäde", "Alternative options:": "Vaihtoehdot:",
        "Skate sharpening chart": "Luistinten teroitustaulukko", "Hollow": "Teroitusura", "Feel": "Tuntuma", "Good for": "Sopii", "Trade-off": "Kompromissi",
        "Compare your options": "Vertaile vaihtoehtoja", "Radius comparison: grip vs glide": "Säteiden vertailu: pito ja luisto", "Beginner guide": "Aloittelijan opas",
        "How to adjust your sharpening": "Näin säädät teroitusta", "If your skates slip during stops or turns, try a smaller hollow for more bite. If your legs feel tired, your skates feel stuck to the ice or you want easier speed, try a larger hollow for more glide.": "Jos luistimet luistavat pysähdyksissä tai käännöksissä, kokeile pienempää teroitusuraa enemmän pitoa varten. Jos jalat väsyvät, luistimet tuntuvat tarttuvan jäähän tai haluat helpompaa nopeutta, kokeile suurempaa teroitusuraa enemmän luistoa varten.",
        "5/8 vs 1/2 skate sharpening": "5/8 vs 1/2 luistinten teroitus", "The difference is simple: 1/2 inch is deeper and more aggressive, while 5/8 inch is shallower and more forgiving. Start at 5/8 unless you know you need extra grip, then test 1/2 if you are sliding out on hard ice.": "Ero on yksinkertainen: 1/2 tuumaa on syvempi ja aggressiivisempi, kun taas 5/8 tuumaa on matalampi ja anteeksiantavampi. Aloita 5/8:sta, ellei tiedä tarvitsevasi lisää pitoa; testaa sitten 1/2:tä, jos liukuu kovalla jäällä.",
        "Calculate your stick flex →": "Laske mailan flex →", "Find your stick length →": "Etsi mailan pituus →", "Protect your edges": "Suojaa terät", "Shop skate care essentials": "Hanki luistinten hoitotarvikkeet",
        "Browse skate accessories →": "Selaa luistintarvikkeita →", "Common questions": "Usein kysyttyä", "Hockey skate sharpening FAQ": "Luistinten teroitus – usein kysyttyä",
        "What hollow should I use for hockey skates?": "Mitä teroitusuraa käytän jääkiekkoluistimissa?", "What is the best hockey skate hollow?": "Mikä on paras luistinten teroitusura?",
        "What is the difference between 5/8 and 1/2 skate sharpening?": "Mitä eroa on 5/8- ja 1/2-teroituksella?", "How do I choose between 3/4 and 7/8?": "Miten valitsen 3/4:n ja 7/8:n välillä?", "How often should hockey skates be sharpened?": "Kuinka usein jääkiekkoluistimet tulisi teroittaa?"
      },
      profiling: {
        "Pro shop sharpening": "Proshopin teroitus",
        "Skate Profiling": "Skridsko profilering",
        "The profile is the curve between the two cutting edges. It changes bite, glide, turn feel and how stable the skates feel on different ice conditions.": "Profilen är kurvan mellan de två skärande kanterna. Den påverkar grepp, glid, känsla i svängar och hur stabila skridskorna känns på olika isförhållanden.",
        "Choose the profile that matches your game.": "Välj den profil som passar ditt spel.",
        "A deeper hollow gives more grip and a stronger bite in the ice. A shallower profile gives more glide and a faster feel. Most pro shops start from your weight, skill level, ice surface and whether you want more control or more speed.": "En djupare profil ger mer grepp och starkare bett i isen. En grundare profil ger mer glid och snabbare känsla. De flesta proffshoppar utgår från vikt, nivå, isförhållanden och om du vill ha mer kontroll eller mer fart.",
        "Good skating is often a balance: enough bite for turns and stops, without making the skates feel sticky or heavy. That is why the best profile is rarely one-size-fits-all.": "Bra skridskoåkning handlar ofta om balans: tillräckligt grepp för svängar och stopp utan att skridskorna känns klibbiga eller tunga. Därför är den bästa profilen sällan en storleksmodell för alla.",
        "Use the sharpening guide →": "Använd slipguiden →",
        "Check your flex →": "Kontrollera din flex →",
        "Most common pro shop profiles": "Vanligaste proffshopprofilerna",
        "Deep bite": "Djupare grepp",
        "1/2 inch profile": "1/2 tum profil",
        "More bite, more control and a stronger feel in tight turns. Best for players who want more grip on hard ice or a more aggressive first step.": "Mer grepp, mer kontroll och starkare känsla i snäva svängar. Bäst för spelare som vill ha mer grepp på hård is eller ett mer aggressivt första steg.",
        "Great for heavier players or hard-ice conditions": "Bra för tyngre spelare eller hård is",
        "Feels more locked in during stops and pivots": "Känns mer låst under stopp och pivoter",
        "Can feel slower and heavier in longer glide": "Kan kännas långsammare och tyngre i längre glid",
        "Balanced": "Balanserad",
        "5/8 inch profile": "5/8 tum profil",
        "Often the best all-round starting point for recreational and competitive players. It keeps the blade stable without being too grabby.": "Ofta den bästa allroundstarten för motions- och tävlingsspelare. Den håller skenan stabil utan att kännas för taggig.",
        "Good for everyday skating and mixed ice": "Bra för vardagsåkning och blandad is",
        "Offers a smooth blend of grip and glide": "Ger en jämn blandning av grepp och glid",
        "One of the most common pro shop recommendations": "Ett av de vanligaste rekommendationerna i proffshoppar",
        "Speed": "Fart",
        "3/4 inch profile": "3/4 tum profil",
        "Shallower groove, less drag and more glide. This profile is popular when a skater wants a faster, lighter feel and good top-end speed.": "Grundare profil, mindre motstånd och mer glid. Den här profilen är populär när spelaren vill ha snabbare, lättare känsla och bra toppfart.",
        "Great for smooth ice and quicker transitions": "Bra för jämn is och snabbare övergångar",
        "Good for players who prioritize glide": "Bra för spelare som prioriterar glid",
        "Less bite in tight pivots and sudden stops": "Mindre grepp i snabba pivoter och hårda stopp",
        "Maximum glide": "Maximal glid",
        "7/8 inch profile": "7/8 tum profil",
        "Very shallow and very fast. This profile suits players who want easy speed and less drag, but it asks for solid edge control and confident turns.": "Mycket grund och mycket snabb. Den här profilen passar spelare som vill ha lätt fart och mindre motstånd, men den kräver god kantkontroll och säkra svängar.",
        "Best for speed-focused skaters": "Bäst för fart inriktade spelare",
        "Very low drag and easy acceleration": "Mycket lågt motstånd och lätt acceleration",
        "Requires good edge feel and technique": "Kräver god kantkänsla och teknik",
        "What pro shops often recommend": "Det proffshoppar ofta rekommenderar",
        "How to choose between the common profiles": "Hur du väljer mellan de vanligaste profilerna",
        "Beginner": "Nybörjare",
        "Control": "Kontroll",
        "All-round": "Allround",
        "Speed": "Fart",
        "Hard ice → more bite": "Hård is → mer grepp",
        "Soft ice → more glide": "Mjuk is → mer glid",
        "Heavier skater → often deeper": "Tyngre spelare → ofta djupare",
        "Faster skater → often shallower": "Snabbare spelare → ofta grundare",
        "The pro shop way": "Proffshopens sätt",
        "Make the profile work with the player.": "Se till att profilen passar spelaren.",
        "Pro shops rarely choose a profile by brand or marketing alone. They look at blade condition, ice type, player weight and whether the skater wants more grip for stops and turns or more glide for speed and clean edges.": "Proffshoppar väljer sällan profil enbart efter märke eller marknadsföring. De tittar på skenans skick, istyp, spelarens vikt och om skridskoåkaren vill ha mer grepp i stopp och svängar eller mer glid för fart och rena kanter.",
        "Ice conditions:": "Isförhållanden:",
        "hard and fast ice usually favors a deeper profile; softer ice often rewards a shallower one.": "hård och snabb is gynnar oftast en djupare profil; mjuk is gynnar ofta en grundare profil.",
        "Skating style:": "Skridskoåkning:",
        "quick, agile players often like a little more bite; smooth and fast skaters may prefer a shallower, faster profile.": "snabba och rörliga spelare gillar ofta lite mer grepp; jämna och snabba spelare föredrar ofta en grundare och snabbare profil.",
        "Blade condition:": "Bladets skick:",
        "a worn or uneven blade should be profiled and checked before changing the hollow dramatically.": "en sliten eller ojämn skena bör profileras och kontrolleras innan du ändrar skålradien mycket.",
        "Next step": "Nästa steg",
        "Use the correct profile": "Använd rätt profil",
        "Start with a standard profile, then test one step deeper or shallower for feel. Small changes often matter more than chasing the “perfect” number.": "Börja med en standardprofil och testa sedan ett steg djupare eller grundare för känsla. Små ändringar betyder ofta mer än att jaga ett “perfekt” tal.",
        "Read the full sharpening guide →": "Läs hela slipguiden →"
      }
    }
  };

  const pageKey = () => document.body.dataset.page || (location.pathname === "/" || /^\/(?:en|sv|no|da|fi|de|fr)\/?$/.test(location.pathname) ? "home" : location.pathname.replace(/^\/(?:en|sv|no|da|fi|de|fr)\//, "").replace(/^\/|\/$/g, ""));
  const nordicWords = {
    no: {
      Hockey: "hockey", stick: "kølle", sticks: "køller", skate: "skøyte", skates: "skøyter", sharpening: "sliping",
      calculator: "kalkulator", guide: "guide", free: "gratis", equipment: "utstyr", player: "spiller", players: "spillere",
      weight: "vekt", height: "høyde", age: "alder", position: "posisjon", style: "stil", playing: "spill",
      recommended: "anbefalt", range: "intervall", result: "resultat", common: "vanlig", best: "beste", starting: "start",
      point: "punkt", length: "lengde", correct: "riktig", choice: "valg", questions: "spørsmål", question: "spørsmål",
      What: "Hva", How: "Hvordan", Use: "Bruk", Find: "Finn", Calculate: "Beregn", Choose: "Velg", Learn: "Lær",
      more: "mer", less: "mindre", and: "og", or: "eller", with: "med", without: "uten", your: "din", you: "du",
      the: "den", a: "en", in: "i", on: "på", off: "av", to: "til", of: "av", is: "er", are: "er", should: "bør",
      Beginner: "Nybegynner", Competitive: "Konkurranse", Elite: "Elite", Forward: "Løper", Defense: "Back", Senior: "Senior", Junior: "Junior", Youth: "Ungdom"
    },
    da: {
      Hockey: "hockey", stick: "stav", sticks: "stave", skate: "skøjte", skates: "skøjter", sharpening: "slibning",
      calculator: "beregner", guide: "guide", free: "gratis", equipment: "udstyr", player: "spiller", players: "spillere",
      weight: "vægt", height: "højde", age: "alder", position: "position", style: "stil", playing: "spil",
      recommended: "anbefalet", range: "interval", result: "resultat", common: "almindelig", best: "bedste", starting: "start",
      point: "punkt", length: "længde", correct: "rigtig", choice: "valg", questions: "spørgsmål", question: "spørgsmål",
      What: "Hvad", How: "Hvordan", Use: "Brug", Find: "Find", Calculate: "Beregn", Choose: "Vælg", Learn: "Lær",
      more: "mere", less: "mindre", and: "og", or: "eller", with: "med", without: "uden", your: "din", you: "du",
      the: "den", a: "en", in: "i", on: "på", off: "af", to: "til", of: "af", is: "er", are: "er", should: "skal",
      Beginner: "Begynder", Competitive: "Konkurrence", Elite: "Elite", Forward: "Angriber", Defense: "Forsvarer", Senior: "Senior", Junior: "Junior", Youth: "Ungdom"
    },
    fi: {
      Hockey: "jääkiekko", stick: "maila", sticks: "mailat", skate: "luistin", skates: "luistimet", sharpening: "teroitus",
      calculator: "laskuri", guide: "opas", free: "ilmainen", equipment: "varusteet", player: "pelaaja", players: "pelaajat",
      weight: "paino", height: "pituus", age: "ikä", position: "pelipaikka", style: "tyyli", playing: "peli",
      recommended: "suositeltu", range: "vaihteluväli", result: "tulos", common: "yleinen", best: "paras", starting: "lähtö",
      point: "kohta", length: "pituus", correct: "oikea", choice: "valinta", questions: "kysymykset", question: "kysymys",
      What: "Mikä", How: "Miten", Use: "Käytä", Find: "Etsi", Calculate: "Laske", Choose: "Valitse", Learn: "Opi",
      more: "enemmän", less: "vähemmän", and: "ja", or: "tai", with: "kanssa", without: "ilman", your: "sinun", you: "sinä",
      the: "", a: "", in: "", on: "päällä", off: "pois", to: "", of: "", is: "on", are: "ovat", should: "pitäisi",
      Beginner: "Aloittelija", Competitive: "Kilpa", Elite: "Huippu", Forward: "Hyökkääjä", Defense: "Puolustaja", Senior: "Seniori", Junior: "Juniori", Youth: "Nuori"
    }
  };
  const translateNordicFallback = (text, code) => {
    let result = text;
    Object.keys(nordicWords[code] || {}).sort((a, b) => b.length - a.length).forEach((word) => {
      const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      result = result.replace(new RegExp(`\\b${escaped}\\b`, "gi"), nordicWords[code][word]);
    });
    return result;
  };
  const translateText = (text, code) => {
    if (code === "en" || !text.trim()) return text;
    const key = text.trim();
    let translated = null;
    const addedCopy = {
      "How to interpret the recommendation": {
        sv: "Så tolkar du rekommendationen", fr: "Comment interpréter la recommandation", de: "So interpretierst du die Empfehlung", no: "Slik tolker du anbefalingen", da: "Sådan fortolker du anbefalingen", fi: "Näin tulkitset suositusta"
      },
      "Treat this number as a starting point, not a rule. Stick flex labels and feel can vary between models, and the calculator cannot assess your shooting technique or comfort.": {
        sv: "Se talet som en utgångspunkt, inte en regel. Flexmärkning och känsla kan skilja sig mellan modeller, och kalkylatorn kan inte bedöma din skotteknik eller komfort.",
        fr: "Considérez ce chiffre comme un point de départ, pas comme une règle. Le flex indiqué et la sensation varient selon les modèles, et le calculateur ne peut pas évaluer votre technique de tir ni votre confort.",
        de: "Betrachte den Wert als Ausgangspunkt, nicht als Regel. Flexangaben und Spielgefühl unterscheiden sich je nach Modell; der Rechner kann weder Schusstechnik noch Komfort beurteilen.",
        no: "Se på tallet som et utgangspunkt, ikke en regel. Flexmerking og følelse varierer mellom modeller, og kalkulatoren kan ikke vurdere skuddteknikk eller komfort.",
        da: "Betragt tallet som et udgangspunkt, ikke en regel. Flexmærkning og følelse varierer mellem modeller, og beregneren kan ikke vurdere skudteknik eller komfort.",
        fi: "Pidä lukua lähtökohtana, älä sääntönä. Flex-merkinnät ja tuntuma vaihtelevat malleittain, eikä laskuri voi arvioida laukaisutekniikkaasi tai mukavuuttasi."
      },
      "Check the flex and length information for the exact stick model you are considering.": {
        sv: "Kontrollera flex- och längduppgifterna för den exakta klubba du funderar på.",
        fr: "Vérifiez les indications de flex et de longueur du modèle exact que vous envisagez.",
        de: "Prüfe die Flex- und Längenangaben genau des Schlägermodells, das du kaufen möchtest.",
        no: "Sjekk flex- og lengdeinformasjonen for den nøyaktige køllemodellen du vurderer.",
        da: "Kontrollér flex- og længdeoplysningerne for den præcise stavmodel, du overvejer.",
        fi: "Tarkista harkitsemasi mailamallin tarkat flex- ja pituustiedot."
      },
      "If possible, compare the recommendation with one nearby softer and one stiffer option, and choose the one you can load comfortably.": {
        sv: "Jämför om möjligt rekommendationen med ett närliggande mjukare och styvare alternativ. Välj det du kan belasta bekvämt.",
        fr: "Si possible, comparez la recommandation à une option légèrement plus souple et une autre plus rigide. Choisissez celle que vous pouvez charger confortablement.",
        de: "Vergleiche die Empfehlung nach Möglichkeit mit einer etwas weicheren und einer etwas steiferen Option. Wähle den Schläger, den du bequem laden kannst.",
        no: "Sammenlign anbefalingen med et litt mykere og et litt stivere alternativ hvis mulig. Velg køllen du kan belaste komfortabelt.",
        da: "Sammenlign om muligt anbefalingen med en lidt blødere og en lidt stivere mulighed. Vælg den stav, du kan belaste komfortabelt.",
        fi: "Vertaa suositusta mahdollisuuksien mukaan hieman pehmeämpään ja jäykempään vaihtoehtoon. Valitse maila, jota pystyt kuormittamaan mukavasti."
      },
      "Decide on your final stick length before cutting. Shortening a shaft makes it feel stiffer; ask a shop if you are unsure.": {
        sv: "Bestäm klubbans slutliga längd innan du kapar den. Ett kortare skaft känns styvare; fråga en butik om du är osäker.",
        fr: "Déterminez la longueur finale avant de couper la crosse. Un manche raccourci paraît plus rigide ; demandez conseil à un magasin en cas de doute.",
        de: "Lege die endgültige Schlägerlänge vor dem Kürzen fest. Ein kürzerer Schaft fühlt sich steifer an; frage im Zweifel im Fachgeschäft nach.",
        no: "Bestem køllens endelige lengde før du kapper den. Et kortere skaft føles stivere; spør en fagbutikk hvis du er usikker.",
        da: "Fastlæg stavens endelige længde, før du kapper den. Et kortere skaft føles stivere; spørg en fagbutik, hvis du er i tvivl.",
        fi: "Päätä mailan lopullinen pituus ennen katkaisua. Lyhyempi varsi tuntuu jäykemmältä; kysy tarvittaessa neuvoa liikkeestä."
      },
      "Use this measurement to narrow your options, then check the actual stick in your normal skating stance. Body proportions and preference are not captured by height alone.": {
        sv: "Använd måttet för att begränsa alternativen och kontrollera sedan klubban i din vanliga skridskohållning. Kroppsproportioner och preferenser fångas inte av längden ensam.",
        fr: "Utilisez cette mesure pour réduire vos options, puis vérifiez la crosse dans votre posture habituelle. La taille seule ne tient pas compte des proportions ni des préférences.",
        de: "Nutze den Messwert, um die Auswahl einzugrenzen, und prüfe den Schläger anschließend in deiner normalen Haltung. Körperproportionen und Vorlieben werden durch die Körpergröße allein nicht erfasst.",
        no: "Bruk målet til å snevre inn alternativene, og prøv deretter køllen i vanlig skøytestilling. Kroppsproporsjoner og preferanser fanges ikke opp av høyden alene.",
        da: "Brug målet til at indsnævre valgmulighederne, og kontrollér derefter staven i din normale skøjtestilling. Kropsproportioner og præferencer kan ikke vurderes ud fra højden alene.",
        fi: "Rajaa vaihtoehtoja mitan avulla ja tarkista maila sitten tavallisessa luisteluasennossasi. Pelkkä pituus ei huomioi mittasuhteita tai mieltymyksiä."
      },
      "Stand in skates with the blade on a flat surface. Check that the blade sits naturally and that you can handle the puck without changing your posture.": {
        sv: "Stå i skridskor med skenan på ett plant underlag. Kontrollera att skenan ligger naturligt mot underlaget och att du kan hantera pucken utan att ändra hållning.",
        fr: "Enfilez vos patins, lame posée sur une surface plane. Vérifiez que la lame repose naturellement et que vous pouvez manier le palet sans modifier votre posture.",
        de: "Stelle dich mit Schlittschuhen auf eine ebene Fläche. Prüfe, ob die Kufe natürlich aufliegt und du den Puck kontrollieren kannst, ohne deine Haltung zu verändern.",
        no: "Stå med skøyter på og skøytejernet på et jevnt underlag. Sjekk at skøytejernet ligger naturlig, og at du kan håndtere pucken uten å endre stilling.",
        da: "Stå med skøjter på og klingen på et plant underlag. Kontrollér, at klingen ligger naturligt, og at du kan håndtere pucken uden at ændre stilling.",
        fi: "Seiso luistimet jalassa tasaisella alustalla. Tarkista, että terä asettuu luontevasti ja pystyt käsittelemään kiekkoa muuttamatta asentoa."
      },
      "Treat the result as a fitting aid, not a required measurement. If you are buying for a child, recheck fit as they grow rather than choosing an overly long stick to grow into.": {
        sv: "Se resultatet som ett hjälpmedel vid utprovning, inte ett kravmått. Kontrollera passformen igen när ett barn växer i stället för att köpa en överdrivet lång klubba att växa i.",
        fr: "Considérez le résultat comme une aide à l’ajustement, pas comme une mesure obligatoire. Pour un enfant, vérifiez régulièrement la taille au lieu de choisir une crosse trop longue pour anticiper sa croissance.",
        de: "Nutze das Ergebnis als Anpassungshilfe, nicht als Pflichtmaß. Prüfe bei Kindern die Passform während des Wachstums erneut, statt einen überlangen Schläger auf Vorrat zu kaufen.",
        no: "Bruk resultatet som hjelp ved tilpasning, ikke som et kravmål. Kontroller passformen på nytt når barn vokser, i stedet for å velge en altfor lang kølle å vokse inn i.",
        da: "Brug resultatet som hjælp til tilpasning, ikke som et kravmål. Kontrollér pasformen igen, efterhånden som børn vokser, i stedet for at vælge en alt for lang stav at vokse ind i.",
        fi: "Käytä tulosta sovituksen apuna, älä ehdottomana mittana. Tarkista lapsen mailan sopivuus kasvun myötä sen sijaan, että ostaisit liian pitkän mailan kasvunvaraksi."
      },
      "This is a starting suggestion for the hollow ground across the blade. It is not a recommendation for the blade profile along its length. A smaller hollow radius makes a deeper groove and usually more bite; a larger radius makes a shallower groove and usually more glide.": {
        sv: "Detta är ett startförslag för skålradien som slipas tvärs över skenan. Det är inte en rekommendation för skenans längsgående profil. En mindre skålradie ger ett djupare spår och vanligtvis mer grepp; en större radie ger ett grundare spår och vanligtvis mer glid.",
        fr: "Il s’agit d’une suggestion de départ pour le creux meulé en travers de la lame, et non pour le profil longitudinal. Un rayon de creux plus petit donne une rainure plus profonde et généralement plus d’accroche ; un rayon plus grand donne une rainure moins profonde et généralement plus de glisse.",
        de: "Dies ist ein Ausgangsvorschlag für den Hohlschliff quer zur Kufe, nicht für das Längsprofil der Kufe. Ein kleinerer Hohlschliff-Radius erzeugt eine tiefere Rille und meist mehr Grip; ein größerer Radius erzeugt eine flachere Rille und meist mehr Gleiten.",
        no: "Dette er et startforslag for slipeprofilen som slipes på tvers av skøytejernet, ikke for skøyteprofilen langs skøytejernet. En mindre slipeprofilradius gir et dypere spor og vanligvis mer grep; en større radius gir et grunnere spor og vanligvis mer glid.",
        da: "Dette er et startforslag til sliberadiusen, der slibes på tværs af klingen, ikke til skøjtens profil langs klingen. En mindre sliberadius giver en dybere rille og typisk mere greb; en større radius giver en fladere rille og typisk mere glid.",
        fi: "Tämä on lähtöehdotus terän poikki hiottavalle teroitusuralle, ei terän pituussuuntaiselle profiilille. Pienempi uran säde tekee urasta syvemmän ja lisää yleensä pitoa; suurempi säde tekee urasta matalamman ja lisää yleensä luistoa."
      },
      "Tell your sharpener the hollow you use now and what you notice: slipping on turns, heavy glide, or comfortable balance.": {
        sv: "Berätta för sliparen vilken skålradie du använder nu och vad du märker: att skridskorna släpper i svängar, att glidet känns tungt eller att balansen känns bra.",
        fr: "Indiquez à l’affûteur le creux utilisé actuellement et vos sensations : dérapage en virage, glisse lourde ou équilibre confortable.",
        de: "Nenne dem Schleifservice deinen aktuellen Hohlschliff und deine Beobachtung: Rutschen in Kurven, schweres Gleiten oder ein angenehmes Gleichgewicht.",
        no: "Fortell sliperen hvilken slipeprofil du bruker nå, og hva du merker: glipp i svinger, tung glid eller god balanse.",
        da: "Fortæl sliberen, hvilken sliberadius du bruger nu, og hvad du mærker: skred i sving, tungt glid eller god balance.",
        fi: "Kerro teroittajalle nykyinen uran säde ja havaintosi: lipsuminen käännöksissä, raskas luisto tai sopiva tasapaino."
      },
      "Change only one step at a time, keep a note of the result, and ask a qualified skate sharpener if you are unsure.": {
        sv: "Ändra bara ett steg åt gången, anteckna resultatet och fråga en kunnig skridskoslipare om du är osäker.",
        fr: "Ne changez que d’un cran à la fois, notez le résultat et demandez conseil à un affûteur qualifié en cas de doute.",
        de: "Ändere jeweils nur eine Stufe, notiere das Ergebnis und frage bei Unsicherheit einen qualifizierten Schlittschuhschleifer.",
        no: "Endre bare ett trinn om gangen, noter resultatet, og spør en kvalifisert skøytesliper hvis du er usikker.",
        da: "Ændr kun ét trin ad gangen, notér resultatet, og spørg en kvalificeret skøjtesliber, hvis du er i tvivl.",
        fi: "Muuta vain yhtä askelta kerrallaan, kirjaa tulos ja kysy tarvittaessa neuvoa ammattitaitoiselta teroittajalta."
      },
      "What to do next": {
        sv: "Nästa steg", fr: "Que faire ensuite", de: "Nächste Schritte", no: "Neste steg", da: "Næste skridt", fi: "Seuraavat vaiheet"
      },
      "Before cutting, check the finished length and consider the change in flex. Ask a qualified shop to help if you are unsure.": {
        sv: "Kontrollera den färdiga längden och tänk på hur flexen påverkas innan du kapar. Be en kunnig butik om hjälp om du är osäker.",
        fr: "Avant de couper, vérifiez la longueur finale et tenez compte de l’effet sur le flex. Demandez conseil à un magasin spécialisé en cas de doute.",
        de: "Prüfe vor dem Kürzen die endgültige Länge und berücksichtige die Änderung des Flex. Bitte im Fachgeschäft um Hilfe, wenn du unsicher bist.",
        no: "Kontroller den endelige lengden og tenk på hvordan flexen påvirkes før du kapper. Spør en fagbutikk om hjelp hvis du er usikker.",
        da: "Kontrollér den færdige længde, og tænk på ændringen i flex, før du kapper. Få hjælp i en fagbutik, hvis du er i tvivl.",
        fi: "Tarkista lopullinen pituus ja huomioi flexin muuttuminen ennen katkaisua. Pyydä apua asiantuntevasta liikkeestä, jos olet epävarma."
      },
      "Use the chart below as a comparison, not a guarantee. Your weight, technique, blade and ice can change how the same hollow feels.": {
        sv: "Använd tabellen som jämförelse, inte som garanti. Vikt, teknik, skena och is kan påverka hur samma skålradie känns.",
        fr: "Utilisez le tableau comme comparaison, pas comme garantie. Votre poids, votre technique, la lame et la glace influent sur les sensations.",
        de: "Nutze die Tabelle zum Vergleich, nicht als Garantie. Gewicht, Technik, Kufe und Eis beeinflussen, wie sich derselbe Hohlschliff anfühlt.",
        no: "Bruk tabellen til sammenligning, ikke som en garanti. Vekt, teknikk, skøytejern og is påvirker hvordan samme slipeprofil føles.",
        da: "Brug tabellen som sammenligning, ikke som garanti. Vægt, teknik, klinge og is påvirker, hvordan den samme sliberadius føles.",
        fi: "Käytä taulukkoa vertailuun, älä takuuna. Paino, tekniikka, terä ja jää vaikuttavat siihen, miltä sama teroitusura tuntuu."
      },
      "Beginner note": {
        sv: "Tips för nybörjare", fr: "Conseil pour débutants", de: "Hinweis für Anfänger", no: "Nybegynnertips", da: "Begyndertip", fi: "Vinkki aloittelijalle"
      },
      "A skate profile describes the blade curve from toe to heel and affects the blade’s contact with the ice and balance feel. It is different from the hollow ground across the blade, which mainly changes bite and glide.": {
        sv: "En skridskoprofil beskriver skenans kurva från tå till häl och påverkar kontakten med isen och balanskänslan. Den skiljer sig från skålradien som slipas tvärs över skenan och främst påverkar grepp och glid.",
        fr: "Le profil d’une lame décrit sa courbe de la pointe au talon et influe sur le contact avec la glace et la sensation d’équilibre. Il diffère du creux meulé en travers de la lame, qui agit surtout sur l’accroche et la glisse.",
        de: "Das Kufenprofil beschreibt die Kurve von der Spitze bis zur Ferse und beeinflusst Eiskontakt und Balancegefühl. Es unterscheidet sich vom quer geschliffenen Hohlschliff, der vor allem Grip und Gleiten beeinflusst.",
        no: "En skøyteprofil beskriver skøytejernets kurve fra tå til hæl og påvirker kontakten med isen og balansefølelsen. Den er forskjellig fra slipeprofilen på tvers av skøytejernet, som hovedsakelig påvirker grep og glid.",
        da: "En skøjteprofil beskriver klingens kurve fra tå til hæl og påvirker kontakten med isen og balancefornemmelsen. Den er forskellig fra sliberadiusen på tværs af klingen, som især påvirker greb og glid.",
        fi: "Luistimen profiili kuvaa terän kaarta kärjestä kantaan ja vaikuttaa jääkosketukseen sekä tasapainon tunteeseen. Se on eri asia kuin terän poikki hiottu teroitusura, joka vaikuttaa etenkin pitoon ja luistoon."
      },
      "Use profile names as a starting point for a conversation, not as directly comparable specifications. Names and geometry can differ between brands and sharpening systems.": {
        sv: "Använd profilnamn som utgångspunkt för ett samtal, inte som direkt jämförbara specifikationer. Namn och geometri kan skilja sig mellan märken och slipningssystem.",
        fr: "Utilisez les noms de profils pour amorcer la discussion, pas comme des spécifications directement comparables. Les noms et la géométrie varient selon les marques et les systèmes d’affûtage.",
        de: "Nutze Profilnamen als Gesprächseinstieg, nicht als direkt vergleichbare Spezifikationen. Namen und Geometrie können je nach Marke und Schleifsystem variieren.",
        no: "Bruk profilnavn som utgangspunkt for en samtale, ikke som direkte sammenlignbare spesifikasjoner. Navn og geometri kan variere mellom merker og slipesystemer.",
        da: "Brug profilnavne som udgangspunkt for en samtale, ikke som direkte sammenlignelige specifikationer. Navne og geometri kan variere mellem mærker og slibesystemer.",
        fi: "Käytä profiilinimiä keskustelun lähtökohtana, älä suoraan vertailukelpoisina määrityksinä. Nimet ja geometria voivat vaihdella tuotemerkkien ja hiontajärjestelmien mukaan."
      },
      "Ask a qualified skate sharpener to check your current profile and explain what a proposed change is expected to do for your balance and skating.": {
        sv: "Be en kunnig skridskoslipare kontrollera din nuvarande profil och förklara hur en föreslagen ändring förväntas påverka balans och skridskoåkning.",
        fr: "Demandez à un affûteur qualifié de vérifier votre profil actuel et d’expliquer l’effet attendu d’un changement sur votre équilibre et votre patinage.",
        de: "Bitte einen qualifizierten Schlittschuhschleifer, dein aktuelles Profil zu prüfen und die erwarteten Auswirkungen einer Änderung auf Balance und Laufgefühl zu erklären.",
        no: "Be en kvalifisert skøytesliper kontrollere den nåværende profilen og forklare hvordan en foreslått endring forventes å påvirke balansen og skøytingen.",
        da: "Bed en kvalificeret skøjtesliber kontrollere din nuværende profil og forklare, hvordan en foreslået ændring forventes at påvirke balance og skøjteløb.",
        fi: "Pyydä ammattitaitoista teroittajaa tarkistamaan nykyinen profiilisi ja selittämään, miten ehdotettu muutos vaikuttaisi tasapainoon ja luisteluun."
      },
      "Fact-check and sources": {
        sv: "Faktagranskning och källor", fr: "Vérification des faits et sources", de: "Faktenprüfung und Quellen", no: "Faktasjekk og kilder", da: "Faktatjek og kilder", fi: "Tietojen tarkistus ja lähteet"
      },
      "A skate profile is the blade’s curve from toe to heel. It affects how much blade contacts the ice and how the skate feels underfoot. It is different from the hollow ground across the blade.": {
        sv: "En skridskoprofil är skenans kurva från tå till häl. Den påverkar hur mycket av skenan som har kontakt med isen och hur skridskon känns under foten. Den skiljer sig från skålradien som slipas tvärs över skenan.",
        fr: "Le profil d’une lame est sa courbe de la pointe au talon. Il détermine la partie de la lame en contact avec la glace et les sensations sous le pied. Il diffère du creux meulé en travers de la lame.",
        de: "Ein Kufenprofil ist die Kurve der Kufe von der Spitze bis zur Ferse. Es beeinflusst, wie viel Kufe das Eis berührt und wie sich der Schlittschuh unter dem Fuß anfühlt. Es unterscheidet sich vom quer geschliffenen Hohlschliff.",
        no: "En skøyteprofil er skøytejernets kurve fra tå til hæl. Den påvirker hvor mye av skøytejernet som berører isen, og hvordan skøyten føles under foten. Den er forskjellig fra slipeprofilen på tvers av skøytejernet.",
        da: "En skøjteprofil er klingens kurve fra tå til hæl. Den påvirker, hvor meget af klingen der rører isen, og hvordan skøjten føles under foden. Den er forskellig fra sliberadiusen på tværs af klingen.",
        fi: "Luistimen profiili on terän kaari kärjestä kantaan. Se vaikuttaa siihen, kuinka suuri osa terästä koskettaa jäätä ja miltä luistin tuntuu jalan alla. Se eroaa terän poikki hiotusta teroitusurasta."
      },
      "Hollow sharpening is a separate choice: it shapes a groove across the blade and mainly changes bite and glide. Use the": {
        sv: "Skålradien är ett separat val: den formar ett spår tvärs över skenan och påverkar främst grepp och glid. Använd ",
        fr: "Le creux d’affûtage est un réglage distinct : il forme une rainure en travers de la lame et modifie surtout l’accroche et la glisse. Consultez le ",
        de: "Der Hohlschliff ist eine separate Einstellung: Er formt eine Rille quer zur Kufe und beeinflusst vor allem Grip und Gleiten. Nutze dafür den ",
        no: "Slipeprofilen er et eget valg: Den lager et spor på tvers av skøytejernet og påvirker hovedsakelig grep og glid. Bruk ",
        da: "Sliberadiusen er et separat valg: Den former en rille på tværs af klingen og påvirker især greb og glid. Brug ",
        fi: "Teroitusura on erillinen valinta: se muodostaa terän poikki uran ja vaikuttaa pääasiassa pitoon ja luistoon. Käytä "
      },
      "for that adjustment.": {
        sv: "för den justeringen.", fr: "pour ce réglage.", de: "für diese Einstellung.", no: "for den justeringen.", da: "til den justering.", fi: "tämän säädön tekemiseen."
      },
      "Use the": {
        sv: "Använd ", fr: "Consultez le ", de: "Nutze den ", no: "Bruk ", da: "Brug ", fi: "Käytä "
      },
      "Names such as Quad, Detroit and Superior are commercial labels, not universal measurements. Ask what specific geometry will be applied to your blade; a profile affects the blade’s curve from toe to heel, while the hollow is a separate groove across the blade.": {
        sv: "Namn som Quad, Detroit och Superior är kommersiella beteckningar, inte universella mått. Fråga vilken geometri som kommer att användas på din skena. Profilen påverkar skenans kurva från tå till häl, medan skålradien är ett separat spår tvärs över skenan.",
        fr: "Des noms comme Quad, Detroit et Superior sont des appellations commerciales, pas des mesures universelles. Demandez quelle géométrie précise sera appliquée à votre lame ; le profil décrit sa courbe de la pointe au talon, tandis que le creux forme une rainure distincte en travers de la lame.",
        de: "Namen wie Quad, Detroit und Superior sind kommerzielle Bezeichnungen, keine einheitlichen Maße. Frage nach der genauen Geometrie für deine Kufe: Das Profil beschreibt die Kurve von der Spitze bis zur Ferse, der Hohlschliff ist eine separate Rille quer zur Kufe.",
        no: "Navn som Quad, Detroit og Superior er kommersielle betegnelser, ikke universelle mål. Spør hvilken geometri som skal brukes på skøytejernet ditt. Profilen påvirker skøytejernets kurve fra tå til hæl, mens slipeprofilen er et eget spor på tvers av skøytejernet.",
        da: "Navne som Quad, Detroit og Superior er kommercielle betegnelser, ikke universelle mål. Spørg, hvilken geometri der bruges på din klinge. Profilen påvirker klingens kurve fra tå til hæl, mens sliberadiusen er en separat rille på tværs af klingen.",
        fi: "Quadin, Detroitin ja Superiorin kaltaiset nimet ovat kaupallisia nimityksiä, eivät yleispäteviä mittoja. Kysy, millainen geometria terääsi tehdään. Profiili vaikuttaa terän kaareen kärjestä kantaan, kun taas teroitusura on erillinen ura terän poikki."
      },
      "Tell the sharpener what you feel on the ice and ask them to check your current profile before recommending a change.": {
        sv: "Berätta för skridskosliparen hur skridskorna känns på isen och be hen kontrollera din nuvarande profil innan en ändring föreslås.",
        fr: "Décrivez vos sensations sur la glace et demandez à l’affûteur de vérifier votre profil actuel avant de proposer un changement.",
        de: "Beschreibe dem Schleifer dein Gefühl auf dem Eis und bitte darum, das aktuelle Profil vor einer Änderung zu prüfen.",
        no: "Fortell sliperen hvordan skøytene føles på isen, og be om at den nåværende profilen kontrolleres før en endring foreslås.",
        da: "Fortæl sliberen, hvordan skøjterne føles på isen, og bed om at få den nuværende profil kontrolleret, før der foreslås en ændring.",
        fi: "Kerro teroittajalle, miltä luistimet tuntuvat jäällä, ja pyydä tarkistamaan nykyinen profiili ennen muutosehdotusta."
      },
      "Ask what the proposed geometry is expected to change for your balance and skating, rather than choosing by the profile name alone.": {
        sv: "Fråga hur den föreslagna geometrin förväntas påverka balansen och skridskoåkningen i stället för att välja enbart utifrån profilnamnet.",
        fr: "Demandez quel effet la géométrie proposée devrait avoir sur votre équilibre et votre patinage, plutôt que de choisir uniquement selon le nom du profil.",
        de: "Frage, wie sich die vorgeschlagene Geometrie voraussichtlich auf Balance und Laufgefühl auswirkt, statt allein nach dem Profilnamen zu wählen.",
        no: "Spør hvordan den foreslåtte geometrien forventes å påvirke balansen og skøytingen, i stedet for å velge ut fra profilnavnet alene.",
        da: "Spørg, hvordan den foreslåede geometri forventes at påvirke din balance og skøjteløb, i stedet for kun at vælge ud fra profilnavnet.",
        fi: "Kysy, miten ehdotetun geometrian odotetaan vaikuttavan tasapainoon ja luisteluun sen sijaan, että valitsisit pelkän profiilinimen perusteella."
      },
      "Keep the hollow the same while testing a profile change. Record your setup and change one variable at a time.": {
        sv: "Behåll samma skålradie när du testar en profiländring. Anteckna din utrustning och ändra en sak i taget.",
        fr: "Gardez le même creux lors du test d’un changement de profil. Notez votre réglage et ne changez qu’un paramètre à la fois.",
        de: "Lass den Hohlschliff beim Test einer Profiländerung unverändert. Notiere dein Setup und ändere immer nur eine Variable auf einmal.",
        no: "Behold samme slipeprofil når du tester en profilendring. Noter oppsettet, og endre én variabel om gangen.",
        da: "Behold samme sliberadius, når du tester en profilændring. Notér dit setup, og ændr kun én variabel ad gangen.",
        fi: "Pidä teroitusura samana, kun testaat profiilimuutosta. Kirjaa asetukset muistiin ja muuta vain yhtä tekijää kerrallaan."
      },
      "to adjust bite or glide separately.": {
        sv: "för att justera grepp eller glid separat.", fr: "pour régler séparément l’accroche ou la glisse.", de: "um Grip oder Gleiten getrennt anzupassen.", no: "for å justere grep eller glid separat.", da: "for at justere greb eller glid separat.", fi: "säätääksesi pitoa tai luistoa erikseen."
      },
      "A more rounded profile can feel quicker to turn, while a flatter profile can provide more blade contact and a steadier feel. The result depends on the skater and the blade; profile names are not universal measurements.": {
        sv: "En rundare profil kan kännas snabbare i svängar, medan en flackare profil kan ge större kontaktyta mot isen och en stabilare känsla. Resultatet beror på spelaren och skenan; profilnamn är inga universella mått.",
        fr: "Un profil plus arrondi peut sembler plus vif en virage, tandis qu’un profil plus plat peut offrir davantage de contact et de stabilité. Le résultat dépend du patineur et de la lame ; les noms de profils ne sont pas des mesures universelles.",
        de: "Ein stärker gerundetes Profil kann sich in Kurven wendiger anfühlen, ein flacheres kann mehr Kufenaufstand und ein stabileres Gefühl bieten. Das Ergebnis hängt von Person und Kufe ab; Profilnamen sind keine einheitlichen Maße.",
        no: "En rundere profil kan føles raskere i svinger, mens en flatere profil kan gi større kontaktflate mot isen og en stødigere følelse. Resultatet avhenger av skøyteløperen og skøytejernet; profilnavn er ikke universelle mål.",
        da: "En mere afrundet profil kan føles hurtigere i sving, mens en fladere profil kan give mere klingekontakt og en mere stabil fornemmelse. Resultatet afhænger af løberen og klingen; profilnavne er ikke universelle mål.",
        fi: "Pyöreämpi profiili voi tuntua ketterämmältä käännöksissä, kun taas tasaisempi profiili voi tarjota enemmän teräkontaktia ja vakaamman tuntuman. Tulos riippuu luistelijasta ja terästä; profiilinimet eivät ole yleispäteviä mittoja."
      },
      "Hollow sharpening is a separate choice: it shapes a groove across the blade and mainly changes bite and glide. Use the hollow guide for that adjustment.": {
        sv: "Skålradien är ett separat val: den formar ett spår tvärs över skenan och påverkar främst grepp och glid. Använd guiden om skålradie för den justeringen.",
        fr: "Le creux d’affûtage est un réglage distinct : il forme une rainure en travers de la lame et modifie surtout l’accroche et la glisse. Consultez le guide du creux pour ce réglage.",
        de: "Der Hohlschliff ist eine separate Einstellung: Er formt eine Rille quer zur Kufe und beeinflusst vor allem Grip und Gleiten. Nutze dafür den Ratgeber zum Hohlschliff.",
        no: "Slipeprofilen er et eget valg: Den lager et spor på tvers av skøytejernet og påvirker hovedsakelig grep og glid. Bruk guiden om slipeprofil for denne justeringen.",
        da: "Sliberadiusen er et separat valg: Den former en rille på tværs af klingen og påvirker især greb og glid. Brug guiden om sliberadius til denne justering.",
        fi: "Teroitusura on erillinen valinta: se muodostaa terän poikki uran ja vaikuttaa pääasiassa pitoon ja luistoon. Käytä teroitusuraopasta tämän säädön tekemiseen."
      },
      "hollow guide": {
        sv: "guiden om skålradie", fr: "guide du creux", de: "Ratgeber zum Hohlschliff", no: "guiden om slipeprofil", da: "guiden om sliberadius", fi: "teroitusuraopasta"
      },
      "These commercial profile names are examples, not standardized measurements. The illustrations are conceptual and not to scale; ask the shop what geometry will be applied to your specific blade.": {
        sv: "Profilnamnen är kommersiella exempel, inte standardiserade mått. Illustrationerna är schematiska och inte skalenliga; fråga verkstaden vilken geometri som kommer att användas på just din skena.",
        fr: "Ces noms de profils commerciaux sont des exemples, pas des mesures normalisées. Les illustrations sont schématiques et non à l’échelle ; demandez à l’atelier quelle géométrie sera appliquée à votre lame.",
        de: "Diese kommerziellen Profilnamen sind Beispiele, keine standardisierten Maße. Die Abbildungen sind schematisch und nicht maßstabsgetreu; frage den Fachbetrieb, welche Geometrie auf deiner Kufe umgesetzt wird.",
        no: "Disse kommersielle profilnavnene er eksempler, ikke standardiserte mål. Illustrasjonene er skjematiske og ikke i målestokk; spør verkstedet hvilken geometri som brukes på akkurat skøytejernet ditt.",
        da: "Disse kommercielle profilnavne er eksempler, ikke standardiserede mål. Illustrationerne er skematiske og ikke målestokstro; spørg værkstedet, hvilken geometri der bruges på netop din klinge.",
        fi: "Nämä kaupalliset profiilinimet ovat esimerkkejä, eivät standardoituja mittoja. Kuvat ovat kaaviomaisia eivätkä mittakaavassa; kysy huollosta, millainen geometria juuri omaan terääsi tehdään."
      },
      "Information and sources last reviewed 15 October 2026. No independent review by a hockey equipment fitter or skate sharpener has been completed.": {
        sv: "Information och källor senast granskade 15 oktober 2026. Ingen oberoende granskning av en hockeyutprovare eller skridskoslipare har genomförts.",
        fr: "Informations et sources examinées pour la dernière fois le 15 octobre 2026. Aucune vérification indépendante par un spécialiste de l’équipement de hockey ou un affûteur de patins n’a été effectuée.",
        de: "Informationen und Quellen zuletzt am 15. Oktober 2026 geprüft. Eine unabhängige Prüfung durch eine Fachkraft für Hockeyausrüstung oder Schlittschuhschliff hat nicht stattgefunden.",
        no: "Informasjon og kilder sist gjennomgått 15. oktober 2026. Ingen uavhengig vurdering av en hockeyutstyrstilpasser eller skøytesliper er utført.",
        da: "Information og kilder senest gennemgået 15. oktober 2026. Der er ikke foretaget en uafhængig vurdering af en hockeyudstyrstilpasser eller skøjtesliber.",
        fi: "Tiedot ja lähteet tarkistettu viimeksi 15. lokakuuta 2026. Jääkiekon varusteasiantuntija tai luistinten teroittaja ei ole tehnyt riippumatonta arviota."
      },
      "USA Hockey: Tips for buying equipment as an adult": {
        sv: "USA Hockey: Råd om att köpa hockeyutrustning som vuxen", fr: "USA Hockey : conseils pour acheter son équipement à l’âge adulte", de: "USA Hockey: Tipps zum Kauf von Ausrüstung für Erwachsene", no: "USA Hockey: Tips om kjøp av hockeyutstyr for voksne", da: "USA Hockey: Tips til køb af hockeyudstyr for voksne", fi: "USA Hockey: Vinkkejä aikuisten varusteiden hankintaan"
      },
      "Better Hockey: Skate sharpening guide": {
        sv: "Better Hockey: Guide till skridskoslipning", fr: "Better Hockey : guide d’affûtage des patins", de: "Better Hockey: Leitfaden zum Schlittschuhschliff", no: "Better Hockey: Guide til skøytesliping", da: "Better Hockey: Guide til skøjteslibning", fi: "Better Hockey: Luistinten teroitusopas"
      }
    };
    if (addedCopy[key]) translated = addedCopy[key][code] || null;
    
    // Try pages object for Swedish, French, German
    if (code === "sv" || code === "fr" || code === "de") {
      const pageTranslation = pages[pageKey()] && pages[pageKey()][key];
      if (pageTranslation) {
        translated = pageTranslation[{ sv: 0, fr: 1, de: 2 }[code]];
      }
    }
    
    // Try common translations
    if (!translated) {
      translated = common[code] && common[code][key];
    }
    
    // Try nordicPages for Nordic languages
    if (!translated && (code === "no" || code === "da" || code === "fi")) {
      const nordicTranslation = nordicPages[code] && nordicPages[code][pageKey()] && nordicPages[code][pageKey()][key];
      if (nordicTranslation) {
        translated = nordicTranslation;
      }
    }
    
    // Fallback for Nordic languages
    if (!translated && (code === "no" || code === "da" || code === "fi")) {
      return translateNordicFallback(text, code);
    }
    
    return translated ? text.replace(key, translated) : text;
  };

  const localizedRouteMatch = location.pathname.match(/^\/(sv|no|da|fi|de|fr)(?:\/|$)/);
  const localizedRoute = Boolean(localizedRouteMatch) || document.documentElement.dataset.localizedRouting === "true";
  const language = localizedRouteMatch ? localizedRouteMatch[1] : localizedRoute ? "en" : localStorage.getItem("hockeytools-language") || "en";
  const applyLanguage = (code) => {
    code = translations[code] ? code : "en";
    document.querySelectorAll("[data-swedish-content]").forEach((element) => {
      element.hidden = code !== "sv";
    });
    const t = translations[code];
    const brand = document.querySelector(".brand");
    if (brand) {
      brand.lastChild.textContent = translateText(" Hockey Tools", code);
      brand.setAttribute("aria-label", translateText("Hockey Tools home", code));
    }
    document.querySelectorAll("body *").forEach((element) => {
      element.childNodes.forEach((node) => {
        if (node.nodeType === 3 && node.textContent.trim() && !/^(SCRIPT|STYLE)$/i.test(element.tagName) && !element.closest("select[data-language]") && !element.closest(".brand")) {
          if (!node.__htOriginal) node.__htOriginal = node.textContent;
          node.textContent = translateText(node.__htOriginal, code);
        }
      });
    });
    document.querySelectorAll("[aria-label], [title], input[placeholder]").forEach((element) => {
      if (element.closest(".brand")) return;
      ["aria-label", "title", "placeholder"].forEach((attribute) => {
        if (element.hasAttribute(attribute)) {
          element.__htAttrs = element.__htAttrs || {};
          if (!element.__htAttrs[attribute]) element.__htAttrs[attribute] = element.getAttribute(attribute);
          element.setAttribute(attribute, translateText(element.__htAttrs[attribute], code));
        }
      });
    });
    document.querySelectorAll("option:not([data-language-option])").forEach((option) => {
      if (!option.__htOriginal) option.__htOriginal = option.textContent;
      option.textContent = translateText(option.__htOriginal, code);
    });
    const skillLabels = {
      sv: ["Nybörjare – lär dig grunderna", "Motionär – spelar mest för nöjes skull", "Tävlingsspelare – organiserat seriespel", "Elit – tävlar på högsta nivå"],
      fr: ["Débutant – apprend les bases", "Loisir – joue surtout pour le plaisir", "Compétition – joue en ligue organisée", "Élite – compétition de haut niveau"],
      de: ["Anfänger – lernt die Grundlagen", "Freizeit – spielt überwiegend zum Spaß", "Wettkampf – spielt in einer organisierten Liga", "Elite – Leistungssport auf hohem Niveau"],
      en: ["Beginner – learning the basics", "Recreational – mostly casual play", "Competitive – organized league play", "Elite – high-performance competition"],
      no: ["Nybegynner – lærer grunnleggende ferdigheter", "Mosjonist – spiller mest for moro skyld", "Konkurranse – spiller i organisert liga", "Elite – konkurrerer på høyt nivå"],
      da: ["Begynder – lærer det grundlæggende", "Motionist – spiller mest for hyggens skyld", "Konkurrence – spiller i organiseret liga", "Elite – konkurrence på højt niveau"],
      fi: ["Aloittelija – opettelee perusteita", "Harrastepelaaja – pelaa enimmäkseen huvikseen", "Kilpapelaaja – pelaa järjestetyssä sarjassa", "Huipputaso – kilpailee korkealla tasolla"]
    };
    const skillSelect = $("flex-skill");
    if (skillSelect) skillSelect.querySelectorAll("option").forEach((option, index) => {
      option.textContent = skillLabels[code][index];
    });
    const lengthOptionLabels = {
      skates: {
        en: ["Skates on", "Shoes / skates off"],
        sv: ["Med skridskor", "Utan skor eller skridskor"],
        fr: ["Avec les patins", "Sans chaussures ni patins"],
        de: ["Mit Schlittschuhen", "Ohne Schuhe oder Schlittschuhe"],
        no: ["Med skøyter", "Uten sko eller skøyter"],
        da: ["Med skøjter", "Uden sko eller skøjter"],
        fi: ["Luistimet jalassa", "Ilman kenkiä tai luistimia"]
      },
      age: {
        en: ["Youth (under 12)", "Junior (12–17)", "Senior (18+)"],
        sv: ["Ungdom (under 12)", "Junior (12–17)", "Senior (18+)"],
        fr: ["Jeunes (moins de 12 ans)", "Junior (12–17 ans)", "Senior (18 ans et plus)"],
        de: ["Jugend (unter 12)", "Junior (12–17)", "Senior (18+)"],
        no: ["Ungdom (under 12)", "Junior (12–17)", "Senior (18+)"],
        da: ["Ungdom (under 12)", "Junior (12–17)", "Senior (18+)"],
        fi: ["Nuoret (alle 12)", "Juniorit (12–17)", "Seniorit (18+)"]
      },
      position: {
        en: ["Forward", "Defense", "Goalie / out player"],
        sv: ["Forward", "Back", "Målvakt / utespelare"],
        fr: ["Attaquant", "Défenseur", "Gardien / joueur de champ"],
        de: ["Stürmer", "Verteidiger", "Torwart / Feldspieler"],
        no: ["Løper", "Back", "Målvakt / utespiller"],
        da: ["Angriber", "Forsvarer", "Målmand / markspiller"],
        fi: ["Hyökkääjä", "Puolustaja", "Maalivahti / kenttäpelaaja"]
      }
    };
    ["skates", "age", "position"].forEach((type) => {
      const select = $(`length-${type}`);
      if (select) select.querySelectorAll("option").forEach((option, index) => {
        option.textContent = lengthOptionLabels[type][code][index];
      });
    });
    const skateOptionLabels = {
      level: {
        en: ["Beginner – learning basic skating", "Recreational – casual hockey", "Competitive – organized league play", "Youth player – age group, any experience"],
        sv: ["Nybörjare – lär dig grunderna på skridskor", "Motionär – spelar mest för nöjes skull", "Tävlingsspelare – organiserat seriespel", "Ungdomsspelare – åldersgrupp, oavsett nivå"],
        fr: ["Débutant – apprend les bases du patinage", "Loisir – joue au hockey pour le plaisir", "Compétition – joue en ligue organisée", "Jeune joueur – catégorie d’âge, tous niveaux"],
        de: ["Anfänger – lernt die Grundlagen des Laufens", "Freizeit – spielt Hockey zum Spaß", "Wettkampf – spielt in einer organisierten Liga", "Jugendspieler – Altersgruppe, unabhängig vom Niveau"],
        no: ["Nybegynner – lærer grunnleggende skøyteferdigheter", "Mosjonist – spiller hockey mest for moro skyld", "Konkurranse – spiller i organisert liga", "Ungdomsspiller – aldersgruppe, uansett erfaring"],
        da: ["Begynder – lærer grundlæggende skøjteløb", "Motionist – spiller mest hockey for hyggens skyld", "Konkurrence – spiller i organiseret liga", "Ungdomsspiller – aldersgruppe, uanset erfaring"],
        fi: ["Aloittelija – opettelee luistelun perusteita", "Harrastepelaaja – pelaa jääkiekkoa enimmäkseen huvikseen", "Kilpapelaaja – pelaa järjestetyssä sarjassa", "Nuori pelaaja – ikäryhmä, kokemuksesta riippumatta"]
      },
      ice: {
        en: ["Hard / fast ice", "Soft / slow ice", "Mixed ice"],
        sv: ["Hård / snabb is", "Mjuk / långsam is", "Blandad is"],
        fr: ["Glace dure / rapide", "Glace souple / lente", "Glace mixte"],
        de: ["Hartes / schnelles Eis", "Weiches / langsames Eis", "Gemischtes Eis"],
        no: ["Hard / rask is", "Myk / langsom is", "Blandet is"],
        da: ["Hård / hurtig is", "Blød / langsom is", "Blandet is"],
        fi: ["Kova / nopea jää", "Pehmeä / hidas jää", "Sekajää"]
      },
      preference: {
        en: ["Balanced grip and glide", "More grip and bite", "More glide and speed"],
        sv: ["Balanserat grepp och glid", "Mer grepp och bett", "Mer glid och fart"],
        fr: ["Accroche et glisse équilibrées", "Plus d’accroche", "Plus de glisse et de vitesse"],
        de: ["Ausgewogener Grip und Gleitfähigkeit", "Mehr Grip und Biss", "Mehr Gleiten und Geschwindigkeit"],
        no: ["Balansert grep og glid", "Mer grep og bitt", "Mer glid og fart"],
        da: ["Balanceret greb og glid", "Mere greb og bid", "Mere glid og fart"],
        fi: ["Tasapainoinen pito ja luisto", "Enemmän pitoa", "Enemmän luistoa ja nopeutta"]
      }
    };
    ["level", "ice", "preference"].forEach((type) => {
      const select = $(`skate-${type}`);
      if (select) select.querySelectorAll("option").forEach((option, index) => {
        option.textContent = skateOptionLabels[type][code][index];
      });
    });
    const sharpeningRows = {
      en: [["Maximum bite", "Strong grip, aggressive turns", "More drag; can feel grabby", "Use only if you know you need strong bite"], ["High grip", "Quick cuts, hard ice, lighter players", "Less glide than larger hollows", "A common grip-first choice"], ["Balanced", "Standard choice for recreational players", "Not the extreme in either direction", "Easy starting point for many players"], ["More glide", "Speed, soft ice, heavier players", "Needs good edge control", "Good glide-first test option"], ["Maximum glide", "Fast skating and low drag", "Less bite for sharp turns", "Best tested with confident edges"]],
      sv: [["Maximalt bett", "Starkt grepp, aggressiva svängar", "Mer motstånd; kan kännas ryckigt", "Använd bara om du vet att du behöver starkt bett"], ["Mycket grepp", "Snabba skär, hård is, lättare spelare", "Mindre glid än större skålradier", "Ett vanligt grepp-först-val"], ["Balanserad", "Standardval för motionsspelare", "Inte extrem åt något håll", "En enkel startpunkt för många spelare"], ["Mer glid", "Fart, mjuk is, tyngre spelare", "Kräver god kantkontroll", "Bra alternativ för att testa mer glid"], ["Maximalt glid", "Snabb åkning och lågt motstånd", "Mindre bett i skarpa svängar", "Testa helst med säkra kanter"]],
      fr: [["Accroche maximale", "Forte accroche, virages agressifs", "Plus de résistance ; peut sembler accrocheur", "À utiliser seulement si vous avez besoin de beaucoup d’accroche"], ["Forte accroche", "Virages rapides, glace dure, joueurs légers", "Moins de glisse que les rayons plus grands", "Un choix courant privilégiant l’accroche"], ["Équilibré", "Choix standard pour les joueurs loisirs", "Ni extrême dans un sens ni dans l’autre", "Un point de départ simple pour beaucoup de joueurs"], ["Plus de glisse", "Vitesse, glace souple, joueurs lourds", "Demande un bon contrôle des carres", "Bon choix pour tester davantage de glisse"], ["Glisse maximale", "Patinage rapide et faible résistance", "Moins d’accroche dans les virages serrés", "À tester avec un bon contrôle des carres"]],
      de: [["Maximaler Biss", "Starker Grip, aggressive Kurven", "Mehr Widerstand; kann klebrig wirken", "Nur wählen, wenn du starken Biss brauchst"], ["Hoher Grip", "Schnelle Kantenwechsel, hartes Eis, leichtere Spieler", "Weniger Gleiten als bei größeren Hohlschliffen", "Eine häufige Grip-orientierte Wahl"], ["Ausgewogen", "Standardwahl für Freizeitspieler", "Nicht extrem in eine Richtung", "Ein einfacher Ausgangspunkt für viele Spieler"], ["Mehr Gleiten", "Tempo, weiches Eis, schwerere Spieler", "Erfordert gute Kantenkontrolle", "Gute Option zum Testen von mehr Gleiten"], ["Maximales Gleiten", "Schnelles Skaten und wenig Widerstand", "Weniger Biss bei engen Kurven", "Am besten mit sicherer Kantenkontrolle testen"]],
      no: [["Maksimalt bitt", "Sterkt grep, aggressive svinger", "Mer motstand; kan føles brått", "Bruk bare hvis du vet at du trenger sterkt bitt"], ["Mye grep", "Raske skjær, hard is, lettere spillere", "Mindre glid enn større slipeprofiler", "Et vanlig grep-først-valg"], ["Balansert", "Standardvalg for mosjonsspillere", "Ikke ekstrem i noen retning", "Et enkelt utgangspunkt for mange spillere"], ["Mer glid", "Fart, myk is, tyngre spillere", "Krever god kantkontroll", "Godt alternativ for å teste mer glid"], ["Maksimalt glid", "Rask skøyting og lav motstand", "Mindre bitt i skarpe svinger", "Testes best med sikre kanter"]],
      da: [["Maksimalt bid", "Stærkt greb, aggressive sving", "Mere modstand; kan føles skarpt", "Brug kun, hvis du ved, at du har brug for stærkt bid"], ["Meget greb", "Hurtige vendinger, hård is, lettere spillere", "Mindre glid end større radier", "Et almindeligt greb-først-valg"], ["Balanceret", "Standardvalg for motionsspillere", "Ikke ekstrem i nogen retning", "Et enkelt udgangspunkt for mange spillere"], ["Mere glid", "Fart, blød is, tungere spillere", "Kræver god kantkontrol", "God mulighed for at teste mere glid"], ["Maksimalt glid", "Hurtigt skøjteløb og lav modstand", "Mindre bid i skarpe sving", "Testes bedst med sikre kanter"]],
      fi: [["Maksimaalinen pito", "Vahva pito, terävät käännökset", "Enemmän vastusta; voi tuntua takertuvan", "Käytä vain, jos tiedät tarvitsevasi vahvaa pitoa"], ["Paljon pitoa", "Nopeat käännökset, kova jää, kevyet pelaajat", "Vähemmän luistoa kuin suuremmilla urilla", "Tavallinen pitoon painottuva valinta"], ["Tasapainoinen", "Harrastajien tavallinen valinta", "Ei ääripää kumpaankaan suuntaan", "Helppo lähtökohta monille pelaajille"], ["Enemmän luistoa", "Nopeus, pehmeä jää, painavat pelaajat", "Vaatii hyvää terien hallintaa", "Hyvä vaihtoehto luiston testaamiseen"], ["Maksimaalinen luisto", "Nopea luistelu ja pieni vastus", "Vähemmän pitoa jyrkissä käännöksissä", "Testaa varmalla terien hallinnalla"]]
    };
    const sharpeningChart = $("sharpening-chart");
    if (sharpeningChart) sharpeningChart.querySelectorAll("tbody tr").forEach((row, index) => row.querySelectorAll("td").forEach((cell, cellIndex) => {
      if (cellIndex > 0) cell.textContent = sharpeningRows[code][index][cellIndex - 1];
    }));
    const comparisonRows = {
      en: [["Very high", "Lower", "Use only if you know you need strong bite"], ["High", "Medium-low", "A common grip-first choice"], ["Medium", "Medium", "Easy starting point for many players"], ["Medium-low", "High", "Good glide-first test option"], ["Low", "Very high", "Best tested with confident edges"]],
      sv: [["Mycket hög", "Lägre", "Använd bara om du vet att du behöver starkt bett"], ["Hög", "Medel-lågt", "Ett vanligt grepp-först-val"], ["Medel", "Medel", "En enkel startpunkt för många spelare"], ["Medel-lågt", "Högt", "Bra alternativ för att testa mer glid"], ["Lågt", "Mycket högt", "Testa helst med säkra kanter"]],
      fr: [["Très élevée", "Faible", "À utiliser seulement si vous avez besoin de beaucoup d’accroche"], ["Élevée", "Moyenne-faible", "Un choix courant privilégiant l’accroche"], ["Moyenne", "Moyenne", "Un point de départ simple pour beaucoup de joueurs"], ["Moyenne-faible", "Élevée", "Bon choix pour tester davantage de glisse"], ["Faible", "Très élevée", "À tester avec un bon contrôle des carres"]],
      de: [["Sehr hoch", "Geringer", "Nur wählen, wenn du starken Biss brauchst"], ["Hoch", "Mittel-niedrig", "Eine häufige Grip-orientierte Wahl"], ["Mittel", "Mittel", "Ein einfacher Ausgangspunkt für viele Spieler"], ["Mittel-niedrig", "Hoch", "Gute Option für einen Gleit-Test"], ["Niedrig", "Sehr hoch", "Am besten mit sicherer Kantenkontrolle testen"]],
      no: [["Svært høy", "Lavere", "Bruk bare hvis du vet at du trenger sterkt bitt"], ["Høy", "Middels-lav", "Et vanlig grep-først-valg"], ["Middels", "Middels", "Et enkelt utgangspunkt for mange spillere"], ["Middels-lav", "Høy", "Godt alternativ for å teste mer glid"], ["Lav", "Svært høy", "Testes best med sikre kanter"]],
      da: [["Meget høj", "Lavere", "Brug kun hvis du ved, at du har brug for stærkt bid"], ["Høj", "Mellem-lav", "Et almindeligt greb-først-valg"], ["Mellem", "Mellem", "Et enkelt udgangspunkt for mange spillere"], ["Mellem-lav", "Høj", "God mulighed for at teste mere glid"], ["Lav", "Meget høj", "Testes bedst med sikre kanter"]],
      fi: [["Erittäin korkea", "Pienempi", "Käytä vain, jos tarvitset vahvaa pitoa"], ["Korkea", "Keskitasoa pienempi", "Tavallinen pitoon painottuva valinta"], ["Keskitaso", "Keskitaso", "Helppo lähtökohta monille pelaajille"], ["Keskitasoa pienempi", "Korkea", "Hyvä vaihtoehto luiston testaamiseen"], ["Matala", "Erittäin korkea", "Testaa varmalla terien hallinnalla"]]
    };
    const comparison = $("radius-comparison");
    if (comparison) comparison.querySelectorAll("tbody tr").forEach((row, index) => row.querySelectorAll("td").forEach((cell, cellIndex) => {
      if (cellIndex > 0) cell.textContent = comparisonRows[code][index][cellIndex - 1];
    }));
    const lengthChart = $("length-chart");
    if (lengthChart) {
      const chart = {
        en: [["Youth", "3'0\"–4'4\"", "Youth", "36–50 in"], ["Junior", "4'0\"–5'2\"", "Junior", "46–57 in"], ["Intermediate", "5'0\"–5'6\"", "Intermediate", "55–60 in"], ["Senior", "5'4\"+", "Senior", "58–63 in"], ["Defense preference", "Any category", "Same class", "Add about 1–2 in"]],
        sv: [["Ungdom", "91–132 cm", "Ungdom", "91–127 cm"], ["Junior", "122–157 cm", "Junior", "117–145 cm"], ["Intermediate", "152–168 cm", "Intermediate", "140–152 cm"], ["Senior", "163+ cm", "Senior", "147–160 cm"], ["Backpreferens", "Alla kategorier", "Samma klass", "Lägg till cirka 2–5 cm"]],
        fr: [["Jeunes", "91–132 cm", "Jeunes", "91–127 cm"], ["Junior", "122–157 cm", "Junior", "117–145 cm"], ["Intermédiaire", "152–168 cm", "Intermédiaire", "140–152 cm"], ["Senior", "163+ cm", "Senior", "147–160 cm"], ["Préférence défense", "Toutes catégories", "Même catégorie", "Ajouter environ 2–5 cm"]],
        de: [["Jugend", "91–132 cm", "Jugend", "91–127 cm"], ["Junior", "122–157 cm", "Junior", "117–145 cm"], ["Intermediate", "152–168 cm", "Intermediate", "140–152 cm"], ["Senior", "163+ cm", "Senior", "147–160 cm"], ["Verteidiger-Präferenz", "Jede Kategorie", "Gleiche Kategorie", "Etwa 2–5 cm hinzufügen"]],
        no: [["Ungdom", "91–132 cm", "Ungdom", "91–127 cm"], ["Junior", "122–157 cm", "Junior", "117–145 cm"], ["Intermediate", "152–168 cm", "Intermediate", "140–152 cm"], ["Senior", "163+ cm", "Senior", "147–160 cm"], ["Backpreferanse", "Alle kategorier", "Samme klasse", "Legg til ca. 2–5 cm"]],
        da: [["Ungdom", "91–132 cm", "Ungdom", "91–127 cm"], ["Junior", "122–157 cm", "Junior", "117–145 cm"], ["Intermediate", "152–168 cm", "Intermediate", "140–152 cm"], ["Senior", "163+ cm", "Senior", "147–160 cm"], ["Forsvarspræference", "Alle kategorier", "Samme klasse", "Tilføj ca. 2–5 cm"]],
        fi: [["Nuoret", "91–132 cm", "Nuoret", "91–127 cm"], ["Juniorit", "122–157 cm", "Juniorit", "117–145 cm"], ["Välisarja", "152–168 cm", "Välisarja", "140–152 cm"], ["Seniorit", "163+ cm", "Seniorit", "147–160 cm"], ["Puolustajan valinta", "Kaikki luokat", "Sama luokka", "Lisää noin 2–5 cm"]]
      };
      lengthChart.querySelectorAll("tbody tr").forEach((row, rowIndex) => {
        row.querySelectorAll("td").forEach((cell, cellIndex) => {
          cell.textContent = chart[code][rowIndex][cellIndex];
        });
      });
    }
    document.documentElement.lang = code === "sv" ? "sv" : code;
    document.querySelectorAll("[data-language]").forEach((select) => { select.value = code; });
    const pageTitles = {
      flex: {
        en: "Hockey Stick Flex Calculator | What Flex Should I Use?",
        sv: "Kalkylator för hockeyklubbans flex | Vilken flex ska jag välja?",
        fr: "Calculateur de flex de crosse | Quel flex choisir ?",
        de: "Hockeyschläger-Flex-Rechner | Welchen Flex sollte ich wählen?",
        no: "Kalkulator for hockeykølleflex | Hvilken flex bør jeg bruke?",
        da: "Beregner til hockeystavens flex | Hvilken flex skal jeg bruge?",
        fi: "Jääkiekkomailan flexlaskuri | Mitä flexiä käytän?"
      },
      length: {
        en: "Hockey Stick Length Calculator | Find the Correct Stick Length",
        sv: "Kalkylator för hockeyklubbans längd | Hitta rätt klubblängd",
        fr: "Calculateur de longueur de crosse | Trouvez la bonne longueur",
        de: "Hockeyschläger-Längenrechner | Die richtige Länge finden",
        no: "Kalkulator for hockeykøllelengde | Finn riktig lengde",
        da: "Beregner til hockeystavens længde | Find den rigtige længde",
        fi: "Jääkiekkomailan pituuslaskuri | Löydä oikea pituus"
      },
      sharpening: {
        en: "Hockey Skate Sharpening Guide | Best Hollow & Calculator",
        sv: "Guide för skridskoslipning | Hitta rätt skålradie",
        fr: "Guide d’affûtage des patins | Trouvez le bon rayon",
        de: "Leitfaden zum Schlittschliff | Den richtigen Hohlschliff finden",
        no: "Guide til skøytesliping | Finn riktig slipeprofil",
        da: "Guide til skøjteslibning | Find den rigtige sliberadius",
        fi: "Luistinten teroitusopas | Löydä sopiva teroitusura"
      },
      profiling: {
        en: "Skate Profiling Guide | Common Hockey Blade Profiles",
        sv: "Skridskoprofilering | Vanliga profiler för hockeyskenor",
        fr: "Profilage des patins | Profils de lame de hockey courants",
        de: "Schlittschuhprofilierung | Häufige Hockey-Kufenprofile",
        no: "Skøyteprofilering | Vanlige hockeyprofileringer",
        da: "Skøjteprofilering | Almindelige hockeyprofiler",
        fi: "Luistimen profilointi | Yleiset jääkiekkoluistimen profiilit"
      }
    };
    const pageDescriptions = {
      flex: {
        en: "Use our hockey stick flex calculator to find your recommended flex and range. Compare youth and senior hockey stick flex charts for your weight, height, age and style.",
        sv: "Använd vår kalkylator för hockeyklubbans flex för att hitta rekommenderad flex och intervall utifrån vikt, längd, ålder och spelstil.",
        fr: "Utilisez notre calculateur de flex de crosse pour trouver le flex et la fourchette recommandés selon votre poids, votre taille, votre âge et votre style.",
        de: "Nutze unseren Hockeyschläger-Flex-Rechner für eine Empfehlung und einen passenden Bereich anhand von Gewicht, Größe, Alter und Spielstil.",
        no: "Bruk kalkulatoren for hockeykølleflex for å finne anbefalt flex og intervall ut fra vekt, høyde, alder og spillestil.",
        da: "Brug beregneren til hockeystavens flex for at finde anbefalet flex og interval ud fra vægt, højde, alder og spillestil.",
        fi: "Käytä jääkiekkomailan flexlaskuria löytääksesi suositellun flexin ja vaihteluvälin painosi, pituutesi, ikäsi ja pelityylisi perusteella."
      },
      length: {
        en: "Use our hockey stick length calculator to find the correct stick length for your height, skates, age group and position. Includes a hockey stick sizing chart and buying guide.",
        sv: "Använd vår kalkylator för hockeyklubbans längd för att hitta rätt klubblängd utifrån längd, skridskor, åldersgrupp och position. Innehåller storlekstabell och köpguide.",
        fr: "Utilisez notre calculateur de longueur de crosse pour trouver la bonne longueur selon votre taille, vos patins, votre âge et votre position. Avec tableau des tailles et guide d’achat.",
        de: "Nutze unseren Hockeyschläger-Längenrechner für die richtige Länge anhand von Größe, Schlittschuhen, Alter und Position. Mit Größentabelle und Kaufberatung.",
        no: "Bruk kalkulatoren for hockeykøllelengde for å finne riktig lengde ut fra høyde, skøyter, aldersgruppe og posisjon. Inneholder størrelsestabell og kjøpsguide.",
        da: "Brug beregneren til hockeystavens længde for at finde den rigtige længde ud fra højde, skøjter, aldersgruppe og position. Indeholder størrelsestabel og købsvejledning.",
        fi: "Käytä mailan pituuslaskuria löytääksesi oikean pituuden pituutesi, luistinten, ikäryhmäsi ja pelipaikkasi perusteella. Mukana kokotaulukko ja osto-opas."
      },
      sharpening: {
        en: "Use this hockey skate sharpening guide to find the best hollow for your weight, skill, ice and grip or glide preference.",
        sv: "Använd den här guiden för skridskoslipning för att hitta rätt skålradie utifrån vikt, nivå, is och preferens för grepp eller glid.",
        fr: "Utilisez ce guide d’affûtage des patins pour trouver le meilleur rayon selon votre poids, votre niveau, la glace et votre préférence d’accroche ou de glisse.",
        de: "Nutze diesen Leitfaden zum Schlittschliff, um den passenden Hohlschliff anhand von Gewicht, Niveau, Eis und Grip- oder Gleitvorliebe zu finden.",
        no: "Bruk denne guiden til skøytesliping for å finne riktig slipeprofil ut fra vekt, nivå, is og preferanse for grep eller glid.",
        da: "Brug denne guide til skøjteslibning for at finde den bedste sliberadius ud fra vægt, niveau, is og ønske om greb eller glid.",
        fi: "Käytä tätä luistinten teroitusopasta löytääksesi sopivan teroitusuran painosi, taitosi, jään ja pito- tai luistotoiveesi perusteella."
      },
      profiling: {
        en: "Learn the most common skate profiling options used by pro shops, from deep bite to faster glide profiles.",
        sv: "Lär dig de vanligaste profilerna som proffshoppar använder, från djupare grepp till snabbare glidprofiler.",
        fr: "Découvrez les profils de patins les plus courants utilisés par les ateliers pro, du confort d’accroche à la glisse rapide.",
        de: "Erfahre mehr über die gängigsten Schlittschuhprofile aus Profiwerkstätten, von starkem Grip bis zu schnellerem Gleiten.",
        no: "Lær om de vanligste skøyteprofilene som proffbutikker bruker, fra dypere grep til raskere glidprofiler.",
        da: "Lær om de mest almindelige skøjteprofiler, som proshoppen bruger, fra dybt greb til hurtigere glidprofiler.",
        fi: "Opi yleisimmät proshopin käyttämät luistimen profiilit, syvästä pidosta nopeampaan luistoon."
      }
    };
    const currentPage = document.body.dataset.page;
    if (!localizedRoute && pageTitles[currentPage]) document.title = pageTitles[currentPage][code];
    const description = document.querySelector('meta[name="description"]');
    if (!localizedRoute && description && pageDescriptions[currentPage]) description.content = pageDescriptions[currentPage][code];
    document.querySelectorAll("nav a").forEach((link) => {
      const href = link.getAttribute("href") || "";
      if (href.includes("flex")) link.textContent = t.flex;
      if (href.includes("length")) link.textContent = t.length;
      if (href.includes("sharpening")) link.textContent = t.skates;
      if (href.includes("profiling")) link.textContent = t.profiling;
    });
    const label = document.querySelector(".language-picker span");
    if (label) label.textContent = t.language;
    const resultLabel = document.querySelector(".result-label");
    if (resultLabel) {
      const resultLabels = {
        flex: { en: "Your recommendation", sv: "Din rekommendation", fr: "Votre recommandation", de: "Deine Empfehlung", no: "Din anbefaling", da: "Din anbefaling", fi: "Suosituksesi" },
        length: { en: "Recommended stick length", sv: "Rekommenderad klubblängd", fr: "Longueur de crosse recommandée", de: "Empfohlene Schlägerlänge", no: "Anbefalt køllelengde", da: "Anbefalet stavlængde", fi: "Suositeltu mailan pituus" },
        sharpening: { en: "Recommended hollow radius", sv: "Rekommenderad skålradie", fr: "Rayon recommandé", de: "Empfohlener Hohlschliff", no: "Anbefalt sliperadius", da: "Anbefalet sliberadius", fi: "Suositeltu teroitussäde" }
      };
      resultLabel.textContent = resultLabels[currentPage]?.[code] || t.recommended;
    }
    const heading = document.querySelector(".tool-hero h1");
    if (heading && !localizedRoute) {
      const headings = {
        flex: ["Hockey Stick Flex Calculator", "Kalkylator för klubflex", "Calculateur de flex de crosse", "Schläger-Flex-Rechner", "Kalkulator for hockeykølleflex", "Beregner til hockeystavens flex", "Jääkiekkomailan flexlaskuri"],
        length: ["Hockey Stick Length Calculator", "Kalkylator för klubblängd", "Calculateur de longueur de crosse", "Schlägerlängen-Rechner", "Kalkulator for hockeykøllelengde", "Beregner til hockeystavens længde", "Jääkiekkomailan pituuslaskuri"],
        sharpening: ["Hockey Skate Sharpening Guide", "Guide för skridskoslipning", "Guide d’affûtage des patins", "Leitfaden zum Schlittschliff", "Guide til skøytesliping", "Guide til skøjteslibning", "Luistinten teroitusopas"],
        profiling: ["Skate Profiling", "Skridsko profilering", "Profilage des patins", "Schlittschuhprofilierung", "Skøyteprofilering", "Skøjteprofilering", "Luistimen profilointi"]
      };
      if (headings[document.body.dataset.page]) heading.textContent = headings[document.body.dataset.page][{ en: 0, sv: 1, fr: 2, de: 3, no: 4, da: 5, fi: 6 }[code]];
    }
    if (heading && localizedRoute) {
      const localizedHeading = document.querySelector('meta[name="ht:heading"]');
      if (localizedHeading) heading.textContent = localizedHeading.content.split(" | ")[0];
    }
    if (currentPage === "sharpening") {
      const bandLabel = $("hollow-range-label");
      if (bandLabel) bandLabel.textContent = sharpeningBandLabels[code] || sharpeningBandLabels.en;
      document.querySelectorAll("body *").forEach((element) => {
        element.childNodes.forEach((node) => {
          if (node.nodeType === 3 && node.textContent.trim() && !/^(SCRIPT|STYLE)$/i.test(element.tagName)) {
            node.textContent = formatHollowUnits(node.textContent);
          }
        });
      });
    }
  };

  document.querySelectorAll("[data-language]").forEach((select) => select.addEventListener("change", () => {
    if (localizedRoute) {
      const targetPath = localizedRouteMatch
        ? select.value === "en"
          ? location.pathname.replace(/^\/(?:sv|no|da|fi|de|fr)(?=\/|$)/, "")
          : location.pathname.replace(/^\/(?:sv|no|da|fi|de|fr)(?=\/|$)/, `/${select.value}`)
        : select.value === "en" ? location.pathname : `/${select.value}${location.pathname}`;
      location.assign(`${targetPath}${location.search}${location.hash}`);
      return;
    }
    localStorage.setItem("hockeytools-language", select.value);
    applyLanguage(select.value);
  }));
  applyLanguage(language);

  const activeLanguage = () => localStorage.getItem("hockeytools-language") || "en";
  const resultMessage = (messages) => messages[activeLanguage()] || messages.en;
  const calculationCopy = {
    en: {
      title: "Calculation breakdown", inputs: "Inputs used", steps: "Step-by-step calculation", formula: "Model used",
      uncertainty: "Uncertainty", sensitivity: "Sensitivity", rounding: "Rounding uses JavaScript Math.round; exact half-values round toward positive infinity.", limits: "Not included", alternative: "Alternative model",
      confidence: "Confidence: Low", notProvided: "not entered",
      noLengthAdjustment: "No final length entered; 152 cm is the reference",
      input: { weight: "Weight", height: "Height", length: "Final stick length", age: "Age group", skill: "Skill level", style: "Playing style", footwear: "Skates", position: "Position", ice: "Ice", preference: "Preference" },
      flex: {
        formula: "Base = body weight in lb ÷ 2. Style: quick release −5, power +5, control −2.5; age: youth −10, junior −5; skill: beginner −5, competitive +2.5, elite +5; height: below 62 in −5, above 74 in +5. Final length adjustment = round(((152 cm − length) ÷ 2.54) × 3). Round total to the nearest 5; minimum 5. Unlisted categories add 0.",
        row: { base: "Weight rule (lb ÷ 2)", style: "Style adjustment", age: "Age-group adjustment", skill: "Skill adjustment", height: "Height adjustment", length: "Length adjustment", subtotal: "Adjusted total before rounding", final: "Round to nearest 5; minimum 5", baseline: "Weight-only baseline, rounded to 5" },
        uncertainty: "The half-body-weight rule and each modifier are hard-coded heuristics, not a standardized flex test or manufacturer-specific data. The ±5 range is a practical test band, not a statistical confidence interval.",
        sensitivity: "Each 1 lb adds 0.5 to the unrounded base; 1 cm of final stick length changes its modifier by about −1.18 before integer rounding. Crossing 62 or 74 in changes the height modifier by 5 points; the final result moves in 5-point steps.",
        limits: "The model does not include stick brand/model, shaft construction, kick point, actual cut or extension, hand position, strength, shooting technique, or the manufacturer's flex test. These can change perceived stiffness.",
        alternative: "Use only body weight in pounds ÷ 2, rounded to the nearest 5. This ignores age, height, skill, style and cut length, so it may produce a different starting value."
      },
      length: {
        formula: "Height in inches = height in cm ÷ 2.54. Subtract 8 in for youth, 9 in for junior or 10 in for senior; subtract 1.5 in without skates; add 2 in for defense or subtract 1 in for goalie/out player. Round to the nearest inch, with a 30 in minimum. Convert to cm; the displayed band is ±2 in.",
        row: { conversion: "Height conversion (cm ÷ 2.54)", age: "Age-group offset", footwear: "Skates-off adjustment", position: "Position adjustment", subtotal: "Length before rounding", final: "Round to nearest inch; minimum 30 in", centimeters: "Convert recommendation to cm", band: "Displayed ±2 in test band" },
        uncertainty: "Age offsets, footwear/position adjustments, inch rounding and the ±2 in band are fixed fitting heuristics, not a validated universal standard. The band is not a statistical confidence interval.",
        sensitivity: "Each 1 cm of height adds about 0.394 in before inch rounding. The displayed length changes only when a rounding boundary is crossed; age, footwear and position choices create fixed step changes.",
        limits: "The model does not include torso, arm or leg proportions, blade lie, stance, stick model, personal preference, growth, or goalie-specific stick design. The goalie/out-player offset is not a goalie-stick sizing model.",
        alternative: "Wear skates, stand naturally with the blade flat, and compare the shaft top with chin-to-nose height. This visual check has no single exact measurement."
      },
      sharpening: {
        formula: "Start at 5/8 in. Weight: below 120 lb +1/8 in; above 210 lb −1/8 in. Preference: grip −1/8 in, glide +1/8 in. Ice: hard +1/8 in, soft −1/8 in. Skill: beginner/youth +1/8 in, competitive −1/8 in. Clamp the sum to 3/8–7/8 in.",
        row: { base: "Starting hollow", weight: "Weight adjustment", skill: "Skill adjustment", ice: "Ice adjustment", preference: "Preference adjustment", subtotal: "Value before clamp", final: "Clamp to 3/8–7/8 in", band: "Suggested adjacent test band (±1/8 in)" },
        uncertainty: "The 5/8 in baseline, 120/210 lb cutoffs and ±1/8 in adjustments are hard-coded heuristics, not a measured optimum. The weight rule makes the hollow shallower below 120 lb and deeper above 210 lb; this may differ from a sharpener's advice. The test band is not statistical.",
        sensitivity: "Each active adjustment changes the raw value by one 1/8 in step. The weight rule changes abruptly at its 120/210 lb cutoffs; clamping prevents recommendations outside 3/8–7/8 in.",
        limits: "The model does not include blade width/height and steel, edge condition, sharpening machine or technician, exact ice hardness/temperature, skating technique, or your previous hollow. The weight cutoffs also cause abrupt changes around 120 and 210 lb.",
        alternative: "Start at 5/8 in without weight, skill or ice corrections, then change one 1/8 in step based on actual grip and glide. A qualified sharpener may recommend another starting hollow."
      }
    },
    sv: {
      title: "Så räknas rekommendationen ut", inputs: "Indata", steps: "Beräkningssteg", formula: "Modell som används",
      uncertainty: "Osäkerhet", sensitivity: "Känslighet", rounding: "Avrundningen följer JavaScript Math.round; exakta halvvärden avrundas mot +∞.", limits: "Faktorer som inte ingår", alternative: "Alternativ modell",
      confidence: "Tillförlitlighet: låg", notProvided: "inte angiven",
      noLengthAdjustment: "Ingen slutlig längd angiven; 152 cm används som referens",
      input: { weight: "Vikt", height: "Längd", length: "Klubbans slutliga längd", age: "Åldersgrupp", skill: "Färdighetsnivå", style: "Spelstil", footwear: "Skridskor", position: "Position", ice: "Is", preference: "Preferens" },
      flex: {
        formula: "Grundvärde = kroppsvikt i lb ÷ 2. Spelstil: snabb release −5, kraftskytt +5, puckkontroll −2,5; ålder: ungdom −10, junior −5; färdighet: nybörjare −5, tävling +2,5, elit +5; längd: under 62 tum −5, över 74 tum +5. Justering för slutlängd = avrunda(((152 cm − längd) ÷ 2,54) × 3). Avrunda summan till närmaste 5; minst 5. Övriga val ger 0.",
        row: { base: "Viktregel (lb ÷ 2)", style: "Justering för spelstil", age: "Justering för åldersgrupp", skill: "Justering för färdighetsnivå", height: "Längdjustering", length: "Justering för klubblängd", subtotal: "Justerad summa före avrundning", final: "Avrunda till närmaste 5; minst 5", baseline: "Enbart vikten, avrundad till 5" },
        uncertainty: "Regeln om halva kroppsvikten i pund och varje tillägg/avdrag är fasta tumregler, inte ett standardiserat flexprov eller tillverkarspecifika data. Intervallet ±5 är ett praktiskt testintervall, inte ett statistiskt konfidensintervall.",
        sensitivity: "Varje extra lb ökar grundvärdet före avrundning med 0,5; 1 cm ändrad slutlängd ändrar längdjusteringen med cirka −1,18 före heltalsavrundning. Vid 62 eller 74 tum ändras längdjusteringen med 5 poäng; slutresultatet ändras i steg om 5.",
        limits: "Modellen tar inte hänsyn till klubbmärke eller modell, skaftkonstruktion, kickpoint, faktisk kapning eller förlängning, handplacering, styrka, skotteknik eller tillverkarens flexprov. Sådant kan ändra den upplevda styvheten.",
        alternative: "Använd enbart kroppsvikt i pund ÷ 2 och avrunda till närmaste 5. Ålder, längd, färdighet, spelstil och kapning bortses då från, så startvärdet kan bli ett annat."
      },
      length: {
        formula: "Längd i tum = längd i cm ÷ 2,54. Dra av 8 tum för ungdom, 9 för junior eller 10 för senior; dra av 1,5 tum utan skridskor; lägg till 2 tum för back eller dra av 1 tum för målvakt/utespelare. Avrunda till närmaste tum, minst 30 tum. Omvandla till cm; visat intervall är ±2 tum.",
        row: { conversion: "Längdomräkning (cm ÷ 2,54)", age: "Åldersgruppens avdrag", footwear: "Justering utan skridskor", position: "Positionsjustering", subtotal: "Längd före avrundning", final: "Avrunda till närmaste tum; minst 30 tum", centimeters: "Omräkning av rekommendationen till cm", band: "Visat testintervall: ±2 tum" },
        uncertainty: "Åldersavdrag, justeringar för skor/position, avrundning till tum och intervallet ±2 tum är fasta utprovningsregler, inte en allmängiltig standard. Intervallet är inte statistiskt.",
        sensitivity: "Varje cm längd ändrar det oavrundade resultatet med cirka 0,394 tum. Det visade måttet ändras först när en avrundningsgräns passeras; ålder, skridskor och position ger fasta steg.",
        limits: "Modellen tar inte hänsyn till proportioner mellan bål, armar och ben, bladets lie, kroppsställning, klubbmodell, personlig preferens, tillväxt eller särskilda målvaktsklubbor. Målvakts-/utespelarvalet är ingen storleksmodell för målvaktsklubbor.",
        alternative: "Ta på skridskorna, stå naturligt med klubbans blad plant mot isen och jämför skaftets topp med höjden mellan haka och näsa. Det är en visuell kontroll, inte ett exakt mått."
      },
      sharpening: {
        formula: "Starta på 5/8 tum. Vikt: under 120 lb +1/8 tum; över 210 lb −1/8 tum. Preferens: mer grepp −1/8 tum, mer glid +1/8 tum. Is: hård +1/8 tum, mjuk −1/8 tum. Färdighet: nybörjare/ungdom +1/8 tum, tävling −1/8 tum. Begränsa summan till 3/8–7/8 tum.",
        row: { base: "Startvärde för skålradie", weight: "Viktjustering", skill: "Färdighetsjustering", ice: "Isjustering", preference: "Preferensjustering", subtotal: "Värde före begränsning", final: "Begränsa till 3/8–7/8 tum", band: "Föreslaget testintervall: intilliggande steg (±1/8 tum)" },
        uncertainty: "Startvärdet 5/8 tum, viktgränserna 120/210 lb och justeringar på ±1/8 tum är fasta tumregler, inte ett uppmätt optimum. Viktregeln ger grundare skålradie under 120 lb och djupare över 210 lb; en slipare kan rekommendera annorlunda. Testintervallet är inte statistiskt.",
        sensitivity: "Varje aktiv justering ändrar råvärdet ett steg på 1/8 tum. Viktregeln ger ett plötsligt steg vid gränserna 120/210 lb; begränsningen håller rekommendationen inom 3/8–7/8 tum.",
        limits: "Modellen tar inte hänsyn till skenans bredd, höjd eller stål, eggarnas skick, slipmaskin eller tekniker, isens exakta hårdhet/temperatur, åkteknik eller din tidigare skålradie. Viktgränserna ger dessutom plötsliga steg vid 120 och 210 lb.",
        alternative: "Börja vid 5/8 tum utan vikt-, färdighets- eller isjustering och ändra sedan ett steg på 1/8 tum utifrån grepp och glid på isen. En kunnig slipare kan rekommendera ett annat startvärde."
      }
    },
    no: {
      title: "Slik beregnes anbefalingen", inputs: "Inndata", steps: "Beregning trinn for trinn", formula: "Modell som brukes",
      uncertainty: "Usikkerhet", sensitivity: "Følsomhet", rounding: "Avrundingen følger JavaScript Math.round; nøyaktige halvverdier rundes mot +∞.", limits: "Faktorer som ikke inngår", alternative: "Alternativ modell",
      confidence: "Pålitelighet: lav", notProvided: "ikke oppgitt",
      noLengthAdjustment: "Ingen endelig lengde oppgitt; 152 cm brukes som referanse",
      input: { weight: "Vekt", height: "Høyde", length: "Endelig køllelengde", age: "Aldersgruppe", skill: "Ferdighetsnivå", style: "Spillestil", footwear: "Skøyter", position: "Posisjon", ice: "Is", preference: "Preferanse" },
      flex: {
        formula: "Grunnverdi = kroppsvekt i lb ÷ 2. Spillestil: rask release −5, kraftskudd +5, puckkontroll −2,5; alder: ungdom −10, junior −5; ferdighet: nybegynner −5, konkurranse +2,5, elite +5; høyde: under 62 tommer −5, over 74 tommer +5. Justering for sluttlengde = avrund(((152 cm − lengde) ÷ 2,54) × 3). Avrund summen til nærmeste 5; minst 5. Andre valg gir 0.",
        row: { base: "Vektregel (lb ÷ 2)", style: "Justering for spillestil", age: "Justering for aldersgruppe", skill: "Justering for ferdighetsnivå", height: "Høydejustering", length: "Justering for køllelengde", subtotal: "Justert sum før avrunding", final: "Avrund til nærmeste 5; minst 5", baseline: "Kun vekt, avrundet til 5" },
        uncertainty: "Regelen om halv kroppsvekt i pund og hvert tillegg/fratrekk er faste tommelfingerregler, ikke en standardisert flextest eller produsentspesifikke data. Intervallet ±5 er et praktisk testområde, ikke et statistisk konfidensintervall.",
        sensitivity: "Hvert ekstra lb øker grunnverdien før avrunding med 0,5; 1 cm endret sluttlengde endrer lengdejusteringen med omtrent −1,18 før heltallsavrunding. Ved 62 eller 74 tommer endres høydejusteringen med 5 poeng; sluttverdien endres i trinn på 5.",
        limits: "Modellen tar ikke hensyn til køllemerke/-modell, skaftkonstruksjon, kickpoint, faktisk kapping/forlengelse, håndplassering, styrke, skuddteknikk eller produsentens flextest. Dette kan endre opplevd stivhet.",
        alternative: "Bruk bare kroppsvekt i pund ÷ 2, avrundet til nærmeste 5. Alder, høyde, ferdighet, spillestil og kapping ignoreres, så startverdien kan bli annerledes."
      },
      length: {
        formula: "Høyde i tommer = høyde i cm ÷ 2,54. Trekk fra 8 tommer for ungdom, 9 for junior eller 10 for senior; trekk fra 1,5 tommer uten skøyter; legg til 2 tommer for back eller trekk fra 1 tomme for målvakt/utespiller. Avrund til nærmeste tomme, minst 30 tommer. Konverter til cm; vist intervall er ±2 tommer.",
        row: { conversion: "Høydeomregning (cm ÷ 2,54)", age: "Fratrekk for aldersgruppe", footwear: "Justering uten skøyter", position: "Posisjonsjustering", subtotal: "Lengde før avrunding", final: "Avrund til nærmeste tomme; minst 30 tommer", centimeters: "Anbefalingen omregnet til cm", band: "Vist testområde: ±2 tommer" },
        uncertainty: "Aldersfratrekk, justeringer for fottøy/posisjon, avrunding til tommer og intervallet ±2 tommer er faste tilpasningsregler, ikke en validert universell standard. Intervallet er ikke statistisk.",
        sensitivity: "Hver cm høyde endrer den uavrundede lengden med omtrent 0,394 tommer. Den viste lengden endres først når en avrundingsgrense passeres; alder, skøyter og posisjon gir faste sprang.",
        limits: "Modellen tar ikke hensyn til kroppsproporsjoner, bladets lie, stilling, køllemodell, personlige preferanser, vekst eller målvaktsspesifikke køller. Valget målvakt/utespiller er ikke en størrelsesmodell for målvaktskøller.",
        alternative: "Ta på skøytene, stå naturlig med køllebladet flatt mot isen, og sammenlign skafttoppen med høyden fra hake til nese. Dette er en visuell kontroll, ikke et eksakt mål."
      },
      sharpening: {
        formula: "Start på 5/8 tomme. Vekt: under 120 lb +1/8 tomme; over 210 lb −1/8 tomme. Preferanse: grep −1/8 tomme, glid +1/8 tomme. Is: hard +1/8 tomme, myk −1/8 tomme. Ferdighet: nybegynner/ungdom +1/8 tomme, konkurranse −1/8 tomme. Begrens summen til 3/8–7/8 tomme.",
        row: { base: "Startverdi for slipeprofil", weight: "Vektjustering", skill: "Ferdighetsjustering", ice: "Isjustering", preference: "Preferansejustering", subtotal: "Verdi før begrensning", final: "Begrens til 3/8–7/8 tomme", band: "Foreslått testområde: nabotrinn (±1/8 tomme)" },
        uncertainty: "Startverdien 5/8 tomme, vektgrensene 120/210 lb og justeringer på ±1/8 tomme er faste tommelfingerregler, ikke et målt optimum. Vektregelen gir grunnere profil under 120 lb og dypere over 210 lb; en skøytesliper kan anbefale noe annet. Testområdet er ikke statistisk.",
        sensitivity: "Hver aktiv justering endrer råverdien med ett trinn på 1/8 tomme. Vektregelen gir et brått sprang ved grensene 120/210 lb; begrensningen holder anbefalingen innenfor 3/8–7/8 tomme.",
        limits: "Modellen tar ikke hensyn til skøytejernets bredde, høyde og stål, eggtilstand, slipemaskin eller tekniker, nøyaktig ishårdhet/-temperatur, skøyteteknikk eller din forrige slipeprofil. Vektgrensene gir også brå sprang ved 120 og 210 lb.",
        alternative: "Start på 5/8 tomme uten justering for vekt, ferdighet eller is, og endre deretter ett trinn på 1/8 tomme ut fra grep og glid på isen. En fagkyndig skøytesliper kan anbefale en annen startverdi."
      }
    },
    da: {
      title: "Sådan beregnes anbefalingen", inputs: "Input", steps: "Beregning trin for trin", formula: "Anvendt model",
      uncertainty: "Usikkerhed", sensitivity: "Følsomhed", rounding: "Afrundingen følger JavaScript Math.round; præcise halvdele afrundes mod +∞.", limits: "Faktorer, der ikke indgår", alternative: "Alternativ model",
      confidence: "Pålidelighed: lav", notProvided: "ikke angivet",
      noLengthAdjustment: "Ingen endelig længde angivet; 152 cm bruges som reference",
      input: { weight: "Vægt", height: "Højde", length: "Stavens endelige længde", age: "Aldersgruppe", skill: "Færdighedsniveau", style: "Spillestil", footwear: "Skøjter", position: "Position", ice: "Is", preference: "Præference" },
      flex: {
        formula: "Grundværdi = kropsvægt i lb ÷ 2. Spillestil: hurtigt release −5, kraftskytte +5, puckkontrol −2,5; alder: ungdom −10, junior −5; færdighed: begynder −5, konkurrence +2,5, elite +5; højde: under 62 tommer −5, over 74 tommer +5. Justering for slutlængde = afrund(((152 cm − længde) ÷ 2,54) × 3). Afrund summen til nærmeste 5; mindst 5. Øvrige valg giver 0.",
        row: { base: "Vægtregel (lb ÷ 2)", style: "Justering for spillestil", age: "Justering for aldersgruppe", skill: "Justering for færdighedsniveau", height: "Højdejustering", length: "Justering for stavlængde", subtotal: "Justeret sum før afrunding", final: "Afrund til nærmeste 5; mindst 5", baseline: "Kun vægt, afrundet til 5" },
        uncertainty: "Reglen om halvdelen af kropsvægten i pund og hvert tillæg/fradrag er faste tommelfingerregler, ikke en standardiseret flextest eller producentdata. Intervallet ±5 er et praktisk testinterval, ikke et statistisk konfidensinterval.",
        sensitivity: "Hvert ekstra lb øger grundværdien før afrunding med 0,5; 1 cm ændret slutlængde ændrer længdejusteringen med cirka −1,18 før heltalsafrunding. Ved 62 eller 74 tommer ændres højdejusteringen med 5 point; slutresultatet ændres i trin på 5.",
        limits: "Modellen tager ikke højde for stavmærke/-model, skaftkonstruktion, kickpoint, faktisk afkortning/forlængelse, håndplacering, styrke, skudteknik eller producentens flextest. Det kan ændre den oplevede stivhed.",
        alternative: "Brug kun kropsvægt i pund ÷ 2, afrundet til nærmeste 5. Alder, højde, færdighed, spillestil og afkortning ignoreres, så startværdien kan blive anderledes."
      },
      length: {
        formula: "Højde i tommer = højde i cm ÷ 2,54. Træk 8 tommer fra for ungdom, 9 for junior eller 10 for senior; træk 1,5 tomme fra uden skøjter; læg 2 tommer til for forsvarer eller træk 1 tomme fra for målmand/markspiller. Afrund til nærmeste tomme, mindst 30 tommer. Omregn til cm; vist interval er ±2 tommer.",
        row: { conversion: "Højdeomregning (cm ÷ 2,54)", age: "Fradrag for aldersgruppe", footwear: "Justering uden skøjter", position: "Positionsjustering", subtotal: "Længde før afrunding", final: "Afrund til nærmeste tomme; mindst 30 tommer", centimeters: "Anbefalingen omregnet til cm", band: "Vist testinterval: ±2 tommer" },
        uncertainty: "Aldersfradrag, justeringer for fodtøj/position, afrunding til tommer og intervallet ±2 tommer er faste tilpasningsregler, ikke en valideret universel standard. Intervallet er ikke statistisk.",
        sensitivity: "Hver cm højde ændrer den uafrundede længde med cirka 0,394 tomme. Den viste længde ændres først, når en afrundingsgrænse krydses; alder, skøjter og position giver faste spring.",
        limits: "Modellen tager ikke højde for kropsproportioner, bladets lie, stilling, stavmodel, personlige præferencer, vækst eller målmandsspecifikke stave. Valget målmand/markspiller er ikke en størrelsesmodel for målmandsstave.",
        alternative: "Tag skøjter på, stå naturligt med køllebladet fladt mod isen, og sammenlign skaftets top med højden fra hage til næse. Det er en visuel kontrol, ikke et præcist mål."
      },
      sharpening: {
        formula: "Start ved 5/8 tomme. Vægt: under 120 lb +1/8 tomme; over 210 lb −1/8 tomme. Præference: greb −1/8 tomme, glid +1/8 tomme. Is: hård +1/8 tomme, blød −1/8 tomme. Færdighed: begynder/ungdom +1/8 tomme, konkurrence −1/8 tomme. Begræns summen til 3/8–7/8 tomme.",
        row: { base: "Startværdi for sliberadius", weight: "Vægtjustering", skill: "Færdighedsjustering", ice: "Isjustering", preference: "Præferencejustering", subtotal: "Værdi før begrænsning", final: "Begræns til 3/8–7/8 tomme", band: "Foreslået testinterval: nabotrin (±1/8 tomme)" },
        uncertainty: "Startværdien 5/8 tomme, vægtgrænserne 120/210 lb og justeringer på ±1/8 tomme er faste tommelfingerregler, ikke et målt optimum. Vægtreglen giver en fladere sliberadius under 120 lb og dybere over 210 lb; en skøjtesliber kan anbefale noget andet. Testintervallet er ikke statistisk.",
        sensitivity: "Hver aktiv justering ændrer råværdien med ét trin på 1/8 tomme. Vægtreglen giver et brat spring ved grænserne 120/210 lb; begrænsningen holder anbefalingen mellem 3/8 og 7/8 tomme.",
        limits: "Modellen tager ikke højde for klingens bredde, højde og stål, æggenes tilstand, slibemaskine eller tekniker, præcis ishårdhed/-temperatur, skøjteteknik eller din tidligere sliberadius. Vægtgrænserne giver desuden spring ved 120 og 210 lb.",
        alternative: "Start ved 5/8 tomme uden justering for vægt, færdighed eller is, og skift derefter ét trin på 1/8 tomme ud fra greb og glid på isen. En erfaren skøjtesliber kan anbefale en anden startværdi."
      }
    },
    fi: {
      title: "Näin suositus lasketaan", inputs: "Käytetyt lähtötiedot", steps: "Laskenta vaiheittain", formula: "Käytetty malli",
      uncertainty: "Epävarmuus", sensitivity: "Herkkyys", rounding: "Pyöristys noudattaa JavaScriptin Math.round-funktiota; tarkat puolikkaat pyöristyvät kohti +∞.", limits: "Ei huomioida", alternative: "Vaihtoehtoinen malli",
      confidence: "Luottamustaso: matala", notProvided: "ei annettu",
      noLengthAdjustment: "Lopullista pituutta ei annettu; vertailupituutena käytetään 152 cm",
      input: { weight: "Paino", height: "Pituus", length: "Mailan lopullinen pituus", age: "Ikäryhmä", skill: "Taitotaso", style: "Pelityyli", footwear: "Luistimet", position: "Pelipaikka", ice: "Jää", preference: "Mieltymys" },
      flex: {
        formula: "Perusarvo = paino paunoina ÷ 2. Pelityyli: nopea laukaisu −5, voimakas laukaus +5, kiekonhallinta −2,5; ikä: nuoret −10, juniorit −5; taitotaso: aloittelija −5, kilpapelaaja +2,5, huipputaso +5; pituus: alle 62 tuumaa −5, yli 74 tuumaa +5. Lopullisen pituuden säätö = pyöristä(((152 cm − pituus) ÷ 2,54) × 3). Pyöristä summa lähimpään 5:een; vähintään 5. Muut valinnat lisäävät 0.",
        row: { base: "Painosääntö (lb ÷ 2)", style: "Pelityylin säätö", age: "Ikäryhmän säätö", skill: "Taitotason säätö", height: "Pituuden säätö", length: "Mailan pituuden säätö", subtotal: "Säädetty summa ennen pyöristystä", final: "Pyöristys lähimpään 5:een; vähintään 5", baseline: "Vain painoon perustuva arvo, pyöristetty 5:een" },
        uncertainty: "Puolen painon sääntö paunoina ja kaikki lisäykset/vähennykset ovat kiinteitä nyrkkisääntöjä, eivät standardoitu flex-testi tai valmistajakohtaista tietoa. ±5-väli on käytännön testialue, ei tilastollinen luottamusväli.",
        sensitivity: "Jokainen lisäpauna kasvattaa pyöristämätöntä perusarvoa 0,5:llä; 1 cm:n muutos lopullisessa pituudessa muuttaa pituussäätöä noin −1,18 ennen kokonaisluvuksi pyöristystä. 62 tai 74 tuuman rajalla pituussäätö muuttuu 5 pistettä; lopputulos pyöristyy 5 pisteen askelin.",
        limits: "Malli ei huomioi mailan merkkiä/mallia, varren rakennetta, kickpointia, todellista lyhennystä/jatkopalaa, käsien paikkaa, voimaa, laukaisutekniikkaa eikä valmistajan flex-testiä. Ne voivat muuttaa koettua jäykkyyttä.",
        alternative: "Käytä vain painoa paunoina ÷ 2 ja pyöristä lähimpään 5:een. Ikä, pituus, taitotaso, pelityyli ja lyhennys jätetään huomiotta, joten lähtöarvo voi poiketa."
      },
      length: {
        formula: "Pituus tuumina = pituus senttimetreinä ÷ 2,54. Vähennä nuorilla 8 tuumaa, junioreilla 9 tai senioreilla 10; vähennä ilman luistimia 1,5 tuumaa; lisää puolustajille 2 tuumaa tai vähennä maalivahdeilta/kenttäpelaajilta 1 tuuma. Pyöristä lähimpään tuumaan, vähintään 30 tuumaa. Muunna senttimetreiksi; näytetty väli on ±2 tuumaa.",
        row: { conversion: "Pituuden muunnos (cm ÷ 2,54)", age: "Ikäryhmän vähennys", footwear: "Luistimeton säätö", position: "Pelipaikan säätö", subtotal: "Pituus ennen pyöristystä", final: "Pyöristys lähimpään tuumaan; vähintään 30 tuumaa", centimeters: "Suosituksen muunnos senttimetreiksi", band: "Näytetty ±2 tuuman testiväli" },
        uncertainty: "Ikävähennykset, jalkine-/pelipaikkasäädöt, tuumapyöristys ja ±2 tuuman väli ovat kiinteitä sovitusnyrkkisääntöjä, eivät validoitu yleisstandardi. Väli ei ole tilastollinen luottamusväli.",
        sensitivity: "Jokainen senttimetri muuttaa pyöristämätöntä pituutta noin 0,394 tuumaa. Näytetty pituus muuttuu vasta pyöristysrajan ylittyessä; ikä, luistimet ja pelipaikka aiheuttavat kiinteitä hyppyjä.",
        limits: "Malli ei huomioi vartalon, käsien tai jalkojen mittasuhteita, lavan lie-kulmaa, asentoa, mailamallia, omia mieltymyksiä, kasvua tai maalivahdin mailan rakennetta. Maalivahti/kenttäpelaaja-valinta ei mitoita maalivahdin mailaa.",
        alternative: "Laita luistimet jalkaan, seiso luonnollisesti lapa tasaisesti jäässä ja vertaa varren päätä leuan ja nenän korkeuteen. Tämä on silmämääräinen tarkistus, ei tarkka mitta."
      },
      sharpening: {
        formula: "Lähtöarvo 5/8 tuumaa. Paino: alle 120 lb +1/8 tuumaa; yli 210 lb −1/8 tuumaa. Mieltymys: pito −1/8 tuumaa, luisto +1/8 tuumaa. Jää: kova +1/8 tuumaa, pehmeä −1/8 tuumaa. Taitotaso: aloittelija/nuori +1/8 tuumaa, kilpataso −1/8 tuumaa. Rajaa summa välille 3/8–7/8 tuumaa.",
        row: { base: "Teroitusuran lähtöarvo", weight: "Painon säätö", skill: "Taitotason säätö", ice: "Jään säätö", preference: "Mieltymyksen säätö", subtotal: "Arvo ennen rajausta", final: "Rajaus välille 3/8–7/8 tuumaa", band: "Ehdotettu vierekkäisten arvojen testiväli (±1/8 tuumaa)" },
        uncertainty: "5/8 tuuman lähtöarvo, 120/210 lb:n painorajat ja ±1/8 tuuman säädöt ovat kiinteitä nyrkkisääntöjä, eivät mitattu optimaalinen arvo. Painosääntö tekee urasta matalamman alle 120 lb:n ja syvemmän yli 210 lb:n kohdalla; teroittaja voi suositella muuta. Testiväli ei ole tilastollinen.",
        sensitivity: "Jokainen aktiivinen säätö muuttaa raakaarvoa yhden 1/8 tuuman askeleen. Painosääntö muuttuu äkillisesti 120/210 lb:n rajoilla; rajaus pitää suosituksen välillä 3/8–7/8 tuumaa.",
        limits: "Malli ei huomioi terän leveyttä/korkeutta tai teräsmateriaalia, särmien kuntoa, teroituskonetta tai tekijää, jään tarkkaa kovuutta/lämpötilaa, luistelutekniikkaa eikä aiempaa teroitusuraa. Painorajat aiheuttavat myös äkilliset muutokset 120 ja 210 lb:n kohdalla.",
        alternative: "Aloita 5/8 tuumasta ilman paino-, taitotaso- tai jääkorjauksia ja muuta sitten yksi 1/8 tuuman askel luistossa tuntuvan pidon ja liu'un perusteella. Ammattitaitoinen teroittaja voi suositella muuta lähtöarvoa."
      }
    },
    de: {
      title: "Berechnung der Empfehlung", inputs: "Verwendete Eingaben", steps: "Berechnung Schritt für Schritt", formula: "Verwendetes Modell",
      uncertainty: "Unsicherheit", sensitivity: "Empfindlichkeit", rounding: "Es gilt JavaScript Math.round; genaue Halbwerte werden gegen +∞ gerundet.", limits: "Nicht berücksichtigt", alternative: "Alternatives Modell",
      confidence: "Vertrauensniveau: niedrig", notProvided: "nicht angegeben",
      noLengthAdjustment: "Keine endgültige Länge angegeben; 152 cm dienen als Referenz",
      input: { weight: "Gewicht", height: "Größe", length: "Endgültige Schlägerlänge", age: "Altersgruppe", skill: "Spielniveau", style: "Spielstil", footwear: "Schlittschuhe", position: "Position", ice: "Eis", preference: "Präferenz" },
      flex: {
        formula: "Ausgangswert = Körpergewicht in lb ÷ 2. Spielstil: schneller Release −5, Kraftschütze +5, Puckkontrolle −2,5; Alter: Jugend −10, Junior −5; Spielniveau: Anfänger −5, Wettkampf +2,5, Elite +5; Größe: unter 62 Zoll −5, über 74 Zoll +5. Längenanpassung = runden(((152 cm − Länge) ÷ 2,54) × 3). Summe auf 5 runden; mindestens 5. Andere Auswahlwerte ergeben 0.",
        row: { base: "Gewichtsregel (lb ÷ 2)", style: "Anpassung für Spielstil", age: "Anpassung für Altersgruppe", skill: "Anpassung für Spielniveau", height: "Größenanpassung", length: "Anpassung für Schlägerlänge", subtotal: "Angepasste Summe vor Rundung", final: "Auf 5 runden; mindestens 5", baseline: "Nur Gewicht, auf 5 gerundet" },
        uncertainty: "Die Regel halbes Körpergewicht in Pfund und alle Zu-/Abschläge sind feste Faustregeln, kein standardisierter Flex-Test und keine herstellerspezifischen Daten. Der Bereich ±5 ist ein praktischer Testbereich, kein statistisches Konfidenzintervall.",
        sensitivity: "Jedes zusätzliche lb erhöht den ungerundeten Grundwert um 0,5; 1 cm Längenänderung verändert den Längenzuschlag vor der Ganzzahlrundung um etwa −1,18. An den Grenzen 62 bzw. 74 Zoll ändert sich der Höhenzuschlag um 5 Punkte; das Endergebnis steigt in 5er-Schritten.",
        limits: "Nicht berücksichtigt werden Marke/Modell, Schaftaufbau, Kickpoint, tatsächliches Kürzen oder Verlängern, Handposition, Kraft, Schusstechnik oder der Flex-Test des Herstellers. Diese Faktoren können die gefühlte Steifigkeit verändern.",
        alternative: "Nur Körpergewicht in Pfund ÷ 2 verwenden und auf 5 runden. Alter, Größe, Spielniveau, Spielstil und Kürzung bleiben unberücksichtigt; der Ausgangswert kann daher abweichen."
      },
      length: {
        formula: "Größe in Zoll = Körpergröße in cm ÷ 2,54. Für Jugend 8 Zoll, Junior 9 Zoll oder Senior 10 Zoll abziehen; ohne Schlittschuhe 1,5 Zoll abziehen; für Verteidiger 2 Zoll addieren oder für Torwart/Feldspieler 1 Zoll abziehen. Auf den nächsten Zoll runden, mindestens 30 Zoll. In cm umrechnen; der angezeigte Bereich ist ±2 Zoll.",
        row: { conversion: "Größenumrechnung (cm ÷ 2,54)", age: "Abzug für Altersgruppe", footwear: "Anpassung ohne Schlittschuhe", position: "Positionsanpassung", subtotal: "Länge vor Rundung", final: "Auf den nächsten Zoll runden; mindestens 30 Zoll", centimeters: "Empfehlung in cm umrechnen", band: "Angezeigter Testbereich: ±2 Zoll" },
        uncertainty: "Altersabzüge, Anpassungen für Schuhe/Position, Zollrundung und der Bereich ±2 Zoll sind feste Anpassungsregeln, kein validierter allgemeiner Standard. Der Bereich ist nicht statistisch.",
        sensitivity: "Jeder Zentimeter Körpergröße verändert die ungerundete Länge um etwa 0,394 Zoll. Der angezeigte Wert ändert sich erst beim Überschreiten einer Rundungsgrenze; Alter, Schuhe und Position verursachen feste Sprünge.",
        limits: "Nicht berücksichtigt werden Körperproportionen, Kufenwinkel, Haltung, Schlägermodell, persönliche Vorlieben, Wachstum oder spezielle Torwartschläger. Die Auswahl Torwart/Feldspieler ist kein Größenmodell für Torwartschläger.",
        alternative: "Schlittschuhe anziehen, natürlich mit flach aufliegender Kufe stehen und die Schaftspitze mit der Höhe zwischen Kinn und Nase vergleichen. Das ist eine Sichtprüfung, kein exaktes Maß."
      },
      sharpening: {
        formula: "Ausgangswert 5/8 Zoll. Gewicht: unter 120 lb +1/8 Zoll; über 210 lb −1/8 Zoll. Präferenz: mehr Grip −1/8 Zoll, mehr Gleiten +1/8 Zoll. Eis: hart +1/8 Zoll, weich −1/8 Zoll. Spielniveau: Anfänger/Jugend +1/8 Zoll, Wettkampf −1/8 Zoll. Summe auf 3/8–7/8 Zoll begrenzen.",
        row: { base: "Ausgangswert für Hohlschliff", weight: "Gewichtsanpassung", skill: "Anpassung für Spielniveau", ice: "Eisanpassung", preference: "Präferenzanpassung", subtotal: "Wert vor Begrenzung", final: "Auf 3/8–7/8 Zoll begrenzen", band: "Vorgeschlagener Testbereich benachbarter Stufen (±1/8 Zoll)" },
        uncertainty: "Der Ausgangswert 5/8 Zoll, die Gewichtsgrenzen 120/210 lb und Anpassungen um ±1/8 Zoll sind feste Faustregeln, kein gemessenes Optimum. Die Gewichtsregel ergibt unter 120 lb einen flacheren und über 210 lb einen tieferen Hohlschliff; ein Schleifservice kann anders beraten. Der Testbereich ist nicht statistisch.",
        sensitivity: "Jede aktive Anpassung ändert den Rohwert um eine Stufe von 1/8 Zoll. Die Gewichtsregel springt an den Grenzen 120/210 lb; die Begrenzung hält die Empfehlung zwischen 3/8 und 7/8 Zoll.",
        limits: "Nicht berücksichtigt werden Kufenbreite/-höhe und Stahl, Zustand der Kanten, Schleifmaschine oder Fachkraft, genaue Eishärte/-temperatur, Lauftechnik oder der bisherige Hohlschliff. An den Gewichtsgrenzen 120 und 210 lb entstehen außerdem abrupte Sprünge.",
        alternative: "Mit 5/8 Zoll ohne Gewichts-, Spielniveau- oder Eisanpassung starten und dann anhand von Grip und Gleiten jeweils um 1/8 Zoll ändern. Eine qualifizierte Fachkraft kann einen anderen Ausgangswert empfehlen."
      }
    },
    fr: {
      title: "Détail du calcul", inputs: "Données utilisées", steps: "Calcul étape par étape", formula: "Modèle utilisé",
      uncertainty: "Incertitude", sensitivity: "Sensibilité", rounding: "L’arrondi suit JavaScript Math.round ; les demi-valeurs exactes sont arrondies vers +∞.", limits: "Facteurs non pris en compte", alternative: "Modèle alternatif",
      confidence: "Niveau de confiance : faible", notProvided: "non renseignée",
      noLengthAdjustment: "Longueur finale non renseignée ; référence utilisée : 152 cm",
      input: { weight: "Poids", height: "Taille", length: "Longueur finale de la crosse", age: "Catégorie d’âge", skill: "Niveau", style: "Style de jeu", footwear: "Patins", position: "Position", ice: "Glace", preference: "Préférence" },
      flex: {
        formula: "Base = poids en lb ÷ 2. Style : tir rapide −5, tireur puissant +5, contrôle du palet −2,5 ; âge : jeune −10, junior −5 ; niveau : débutant −5, compétition +2,5, élite +5 ; taille : sous 62 pouces −5, au-dessus de 74 pouces +5. Correction de longueur = arrondir(((152 cm − longueur) ÷ 2,54) × 3). Arrondir le total au multiple de 5 le plus proche ; minimum 5. Les autres choix ajoutent 0.",
        row: { base: "Règle de poids (lb ÷ 2)", style: "Ajustement du style de jeu", age: "Ajustement de l’âge", skill: "Ajustement du niveau", height: "Ajustement de la taille", length: "Ajustement de la longueur", subtotal: "Total ajusté avant arrondi", final: "Arrondi au multiple de 5 le plus proche ; minimum 5", baseline: "Poids seul, arrondi à 5" },
        uncertainty: "La règle de la moitié du poids en livres et chaque ajustement sont des heuristiques fixes, pas un test de flex standardisé ni des données propres aux fabricants. La plage ±5 est une plage pratique d’essai, pas un intervalle de confiance statistique.",
        sensitivity: "Chaque lb supplémentaire augmente la base non arrondie de 0,5 ; 1 cm de longueur finale modifie la correction d’environ −1,18 avant l’arrondi à l’entier. Aux seuils de 62 et 74 pouces, la correction de taille change de 5 points ; le résultat final progresse par pas de 5.",
        limits: "Le modèle ne prend pas en compte la marque/le modèle, la construction du manche, le point de flexion, la coupe ou rallonge réelle, la position des mains, la force, la technique de tir ni le test de flex du fabricant. Ces facteurs modifient la rigidité ressentie.",
        alternative: "Utiliser uniquement le poids en livres ÷ 2, arrondi au multiple de 5 le plus proche. L’âge, la taille, le niveau, le style et la coupe sont ignorés ; le résultat peut donc différer."
      },
      length: {
        formula: "Taille en pouces = taille en cm ÷ 2,54. Soustraire 8 pouces pour les jeunes, 9 pour les juniors ou 10 pour les seniors ; soustraire 1,5 pouce sans patins ; ajouter 2 pouces pour un défenseur ou soustraire 1 pouce pour un gardien/joueur de champ. Arrondir au pouce le plus proche, minimum 30 pouces. Convertir en cm ; la plage affichée est de ±2 pouces.",
        row: { conversion: "Conversion de la taille (cm ÷ 2,54)", age: "Correction liée à l’âge", footwear: "Correction sans patins", position: "Correction de position", subtotal: "Longueur avant arrondi", final: "Arrondi au pouce le plus proche ; minimum 30 pouces", centimeters: "Conversion de la recommandation en cm", band: "Plage d’essai affichée : ±2 pouces" },
        uncertainty: "Les corrections d’âge, de chaussures/position, l’arrondi au pouce et la plage ±2 pouces sont des heuristiques fixes, pas une norme universelle validée. La plage n’est pas statistique.",
        sensitivity: "Chaque cm de taille modifie la longueur non arrondie d’environ 0,394 pouce. La valeur affichée ne change qu’au franchissement d’un seuil d’arrondi ; l’âge, les patins et la position créent des sauts fixes.",
        limits: "Le modèle ne prend pas en compte les proportions du corps, l’angle de la lame, la posture, le modèle de crosse, les préférences, la croissance ni la conception des crosses de gardien. Le choix gardien/joueur de champ ne constitue pas un modèle de taille pour les crosses de gardien.",
        alternative: "Chaussez vos patins, tenez-vous naturellement avec la lame à plat et comparez le haut du manche à la hauteur entre le menton et le nez. C’est un contrôle visuel, pas une mesure exacte."
      },
      sharpening: {
        formula: "Départ à 5/8 pouce. Poids : sous 120 lb +1/8 pouce ; au-dessus de 210 lb −1/8 pouce. Préférence : accroche −1/8 pouce, glisse +1/8 pouce. Glace : dure +1/8 pouce, molle −1/8 pouce. Niveau : débutant/jeune +1/8 pouce, compétition −1/8 pouce. Limiter le total entre 3/8 et 7/8 pouce.",
        row: { base: "Creux de départ", weight: "Correction du poids", skill: "Correction du niveau", ice: "Correction de la glace", preference: "Correction de la préférence", subtotal: "Valeur avant limitation", final: "Limiter entre 3/8 et 7/8 pouce", band: "Plage d’essai des valeurs voisines (±1/8 pouce)" },
        uncertainty: "Le creux de départ de 5/8 pouce, les seuils de 120/210 lb et les corrections de ±1/8 pouce sont des heuristiques fixes, pas un optimum mesuré. La règle de poids donne un creux moins profond sous 120 lb et plus profond au-dessus de 210 lb ; un affûteur peut conseiller autrement. La plage d’essai n’est pas statistique.",
        sensitivity: "Chaque correction active modifie la valeur brute d’un cran de 1/8 pouce. La règle de poids provoque un saut aux seuils de 120/210 lb ; la limitation maintient la recommandation entre 3/8 et 7/8 pouce.",
        limits: "Le modèle ne tient pas compte de la largeur/hauteur et de l’acier de la lame, de l’état des carres, de la machine ou de l’affûteur, de la dureté/température exacte de la glace, de la technique ni du creux précédent. Les seuils de poids créent aussi des sauts à 120 et 210 lb.",
        alternative: "Commencer à 5/8 pouce sans correction de poids, de niveau ou de glace, puis ajuster d’un cran de 1/8 pouce selon l’accroche et la glisse ressenties. Un affûteur qualifié peut conseiller un autre point de départ."
      }
    }
  };
  const calculationOptions = {
    en: { youth: "Youth", junior: "Junior", senior: "Senior", beginner: "Beginner", recreational: "Recreational", competitive: "Competitive", elite: "Elite", quick: "Quick release", power: "Power shooting", control: "Puck control and passing", balanced: "Balanced", on: "Skates on", off: "Skates off", forward: "Forward", defense: "Defense", goalie: "Goalie / out player", hard: "Hard / fast ice", soft: "Soft / slow ice", mixed: "Mixed ice", grip: "More grip and bite", glide: "More glide and speed" },
    sv: { youth: "Ungdom", junior: "Junior", senior: "Senior", beginner: "Nybörjare", recreational: "Motionär", competitive: "Tävlingsspelare", elite: "Elit", quick: "Snabb release", power: "Kraftfullt skott", control: "Puckkontroll och passningar", balanced: "Balanserad", on: "Med skridskor", off: "Utan skridskor", forward: "Forward", defense: "Back", goalie: "Målvakt/utespelare", hard: "Hård/snabb is", soft: "Mjuk/långsam is", mixed: "Blandad is", grip: "Mer grepp", glide: "Mer glid" },
    no: { youth: "Ungdom", junior: "Junior", senior: "Senior", beginner: "Nybegynner", recreational: "Mosjonist", competitive: "Konkurransespiller", elite: "Elite", quick: "Rask release", power: "Kraftskudd", control: "Puckkontroll og pasninger", balanced: "Balansert", on: "Med skøyter", off: "Uten skøyter", forward: "Løper", defense: "Back", goalie: "Målvakt/utespiller", hard: "Hard/rask is", soft: "Myk/langsom is", mixed: "Blandet is", grip: "Mer grep", glide: "Mer glid" },
    da: { youth: "Ungdom", junior: "Junior", senior: "Senior", beginner: "Begynder", recreational: "Motionsspiller", competitive: "Konkurrencespiller", elite: "Elite", quick: "Hurtigt release", power: "Kraftskud", control: "Puckkontrol og afleveringer", balanced: "Balanceret", on: "Med skøjter", off: "Uden skøjter", forward: "Angriber", defense: "Forsvarer", goalie: "Målmand/markspiller", hard: "Hård/hurtig is", soft: "Blød/langsom is", mixed: "Blandet is", grip: "Mere greb", glide: "Mere glid" },
    fi: { youth: "Nuori", junior: "Juniori", senior: "Aikuinen", beginner: "Aloittelija", recreational: "Harrastepelaaja", competitive: "Kilpapelaaja", elite: "Huipputaso", quick: "Nopea laukaisu", power: "Voimakas laukaus", control: "Kiekonhallinta ja syötöt", balanced: "Tasapainoinen", on: "Luistimet jalassa", off: "Ilman luistimia", forward: "Hyökkääjä", defense: "Puolustaja", goalie: "Maalivahti/kenttäpelaaja", hard: "Kova/nopea jää", soft: "Pehmeä/hidas jää", mixed: "Sekalainen jää", grip: "Enemmän pitoa", glide: "Enemmän luistoa" },
    de: { youth: "Jugend", junior: "Junior", senior: "Senior", beginner: "Anfänger", recreational: "Freizeit", competitive: "Wettkampf", elite: "Elite", quick: "Schneller Release", power: "Kraftschuss", control: "Puckkontrolle und Pässe", balanced: "Ausgewogen", on: "Mit Schlittschuhen", off: "Ohne Schlittschuhe", forward: "Stürmer", defense: "Verteidiger", goalie: "Torwart/Feldspieler", hard: "Hartes/schnelles Eis", soft: "Weiches/langsames Eis", mixed: "Gemischtes Eis", grip: "Mehr Grip", glide: "Mehr Gleiten" },
    fr: { youth: "Jeune", junior: "Junior", senior: "Senior", beginner: "Débutant", recreational: "Loisir", competitive: "Compétition", elite: "Élite", quick: "Tir rapide", power: "Tir puissant", control: "Contrôle et passes", balanced: "Équilibré", on: "Avec patins", off: "Sans patins", forward: "Attaquant", defense: "Défenseur", goalie: "Gardien/joueur de champ", hard: "Glace dure/rapide", soft: "Glace souple/lente", mixed: "Glace variable", grip: "Plus d’accroche", glide: "Plus de glisse" }
  };
  const currentLanguage = () => document.querySelector("[data-language]")?.value || activeLanguage();
  const calculationOption = (id, code = currentLanguage()) => {
    const select = $(id);
    return calculationOptions[code]?.[select.value] || select.selectedOptions[0].textContent;
  };
  const calculationUnits = {
    en: { flex: "flex", flexPoints: "flex points", inch: "in" },
    sv: { flex: "flex", flexPoints: "flexenheter", inch: "tum" },
    no: { flex: "flex", flexPoints: "flexpoeng", inch: "tommer" },
    da: { flex: "flex", flexPoints: "flexpoint", inch: "tommer" },
    fi: { flex: "flex", flexPoints: "flexpistettä", inch: "tuumaa" },
    de: { flex: "Flex", flexPoints: "Flex-Punkte", inch: "Zoll" },
    fr: { flex: "flex", flexPoints: "points de flex", inch: "pouce" }
  };
  const calculationInchForms = {
    en: ["in", "in"], sv: ["tum", "tum"], no: ["tomme", "tommer"],
    da: ["tomme", "tommer"], fi: ["tuuma", "tuumaa"], de: ["Zoll", "Zoll"],
    fr: ["pouce", "pouces"]
  };
  const calculationUnit = (unit, value, code) => unit === "inch"
    ? calculationInchForms[code]?.[Math.abs(value) === 1 ? 0 : 1] || "in"
    : calculationUnits[code]?.[unit] || calculationUnits.en[unit];
  const calculationNumber = (value, code = currentLanguage()) => new Intl.NumberFormat(code, { maximumFractionDigits: 6 }).format(value);
  const signedValue = (value, unit, code = currentLanguage()) => {
    const localizedUnit = calculationUnit(unit, value, code);
    return value === 0 ? `0 ${localizedUnit}` : `${value > 0 ? "+" : "−"}${calculationNumber(Math.abs(value), code)} ${localizedUnit}`;
  };
  const signedTerm = (value, unit, code) => `${value < 0 ? "−" : "+"}${calculationNumber(Math.abs(value), code)} ${calculationUnit(unit, value, code)}`;
  const renderCalculationReport = (kind, report) => {
    const code = currentLanguage();
    const languageCopy = calculationCopy[code] || calculationCopy.en;
    const copy = languageCopy[kind];
    const root = $(`${kind}-calculation-breakdown`);
    if (!root || !copy) return;
    root.replaceChildren();
    const appendText = (tag, text, className) => {
      const element = document.createElement(tag);
      element.textContent = text;
      if (className) element.className = className;
      root.append(element);
      return element;
    };
    appendText("h3", languageCopy.title);
    appendText("p", `${languageCopy.inputs}: ${report.inputs.map(({ key, getValue }) => `${languageCopy.input[key]}: ${getValue()}`).join("; ")}`);
    appendText("p", languageCopy.steps);
    const roundingNote = kind === "sharpening" ? "" : ` ${languageCopy.rounding}`;
    appendText("p", `${languageCopy.formula}: ${copy.formula}${roundingNote}`, "calculation-note");
    const list = document.createElement("ol");
    report.steps.forEach(({ key, value }) => {
      const item = document.createElement("li");
      item.textContent = `${copy.row[key]}: ${typeof value === "function" ? value(code) : value}`;
      list.append(item);
    });
    root.append(list);
    appendText("p", `${languageCopy.uncertainty}: ${copy.uncertainty}`, "calculation-note");
    appendText("p", `${languageCopy.sensitivity}: ${copy.sensitivity}`, "calculation-note");
    appendText("p", `${languageCopy.limits}: ${copy.limits}`, "calculation-note");
    appendText("p", `${languageCopy.alternative}: ${copy.alternative}`, "calculation-note");
    appendText("p", languageCopy.confidence, "calculation-note");
    root.hidden = false;
  };
  let lastCalculationReport = null;
  const renderLastCalculationReport = () => {
    if (lastCalculationReport) renderCalculationReport(lastCalculationReport.kind, lastCalculationReport.report);
  };
  document.querySelectorAll("[data-language]").forEach((select) => select.addEventListener("change", () => {
    setTimeout(renderLastCalculationReport, 0);
  }));
  function formatHollowUnits(text) {
    return text
    .replace(/3\/8\s*(?:"|inches?|tum|pouces?|Zoll)(?!\s*\()/gi, '3/8" (9 mm)')
    .replace(/1\/2\s*(?:"|inches?|tum|pouces?|Zoll)(?!\s*\()/gi, '1/2" (13 mm)')
    .replace(/5\/8\s*(?:"|inches?|tum|pouces?|Zoll)(?!\s*\()/gi, '5/8" (16 mm)')
    .replace(/3\/4\s*(?:"|inches?|tum|pouces?|Zoll)(?!\s*\()/gi, '3/4" (19 mm)')
    .replace(/7\/8\s*(?:"|inches?|tum|pouces?|Zoll)(?!\s*\()/gi, '7/8" (22 mm)')
    .replace(/3\/8(?!["\s]*(?:\(|inch|tum|pouce|Zoll))/gi, '3/8" (9 mm)')
    .replace(/1\/2(?!["\s]*(?:\(|inch|tum|pouce|Zoll))/gi, '1/2" (13 mm)')
    .replace(/5\/8(?!["\s]*(?:\(|inch|tum|pouce|Zoll))/gi, '5/8" (16 mm)')
    .replace(/3\/4(?!["\s]*(?:\(|inch|tum|pouce|Zoll))/gi, '3/4" (19 mm)')
    .replace(/7\/8(?!["\s]*(?:\(|inch|tum|pouce|Zoll))/gi, '7/8" (22 mm)');
  }

  if (document.body.dataset.page === "flex" && $("flex-form")) {
    const flexLengthParam = new URLSearchParams(window.location.search).get("length");
    if (flexLengthParam && $("flex-length-cm")) {
      const parsedLength = Number(flexLengthParam);
      if (parsedLength >= 90 && parsedLength <= 230) $("flex-length-cm").value = parsedLength;
    }
    const flexAgeParam = new URLSearchParams(window.location.search).get("age");
    if (flexAgeParam && ["youth", "junior", "senior"].includes(flexAgeParam)) $("flex-age").value = flexAgeParam;
    $("flex-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const enteredWeight = Number($("flex-weight").value);
      let weight = enteredWeight;
      if ($("flex-unit").value === "kg") weight *= 2.20462;
      const baseFlex = weight / 2;
      const height = Number($("flex-height-cm").value) / 2.54;
      const finalLengthCm = Number($("flex-length-cm").value);
      const style = $("flex-style").value;
      const age = $("flex-age").value;
      const skill = $("flex-skill").value;
      const styleAdjustment = style === "quick" ? -5 : style === "power" ? 5 : style === "control" ? -2.5 : 0;
      const ageAdjustment = age === "youth" ? -10 : age === "junior" ? -5 : 0;
      const skillAdjustment = skill === "beginner" ? -5 : skill === "competitive" ? 2.5 : skill === "elite" ? 5 : 0;
      const heightAdjustment = height < 62 ? -5 : height > 74 ? 5 : 0;
      let lengthAdjustment = 0;
      if (finalLengthCm >= 90 && finalLengthCm <= 230) {
        const lengthDifferenceInches = (152 - finalLengthCm) / 2.54;
        lengthAdjustment = Math.round(lengthDifferenceInches * 3);
      }
      const adjustedFlex = baseFlex + styleAdjustment + ageAdjustment + skillAdjustment + heightAdjustment + lengthAdjustment;
      const flex = roundToFive(adjustedFlex);
      const flexReport = {
        inputs: [
          { key: "weight", getValue: () => `${enteredWeight} ${$("flex-unit").value} (${calculationNumber(weight)} lb)` },
          { key: "height", getValue: () => `${$("flex-height-cm").value} cm (${calculationNumber(height)} in)` },
          { key: "age", getValue: () => calculationOption("flex-age") },
          { key: "skill", getValue: () => calculationOption("flex-skill") },
          { key: "style", getValue: () => calculationOption("flex-style") },
          { key: "length", getValue: () => finalLengthCm >= 90 && finalLengthCm <= 230 ? `${finalLengthCm} cm` : calculationCopy[currentLanguage()].notProvided }
        ],
        steps: [
          { key: "base", value: (code) => `${$("flex-unit").value === "kg" ? `${enteredWeight} kg × 2.20462 = ${calculationNumber(weight, code)} lb; ` : ""}${calculationNumber(weight, code)} lb ÷ 2 = ${calculationNumber(baseFlex, code)} flex` },
          { key: "style", value: (code) => signedValue(styleAdjustment, "flexPoints", code) },
          { key: "age", value: (code) => signedValue(ageAdjustment, "flexPoints", code) },
          { key: "skill", value: (code) => signedValue(skillAdjustment, "flexPoints", code) },
          { key: "height", value: (code) => `${$("flex-height-cm").value} cm ÷ 2.54 = ${calculationNumber(height, code)} ${calculationUnit("inch", height, code)}; ${signedValue(heightAdjustment, "flexPoints", code)}` },
          { key: "length", value: (code) => finalLengthCm >= 90 && finalLengthCm <= 230 ? `round((152 − ${finalLengthCm}) ÷ 2.54 × 3) = ${signedValue(lengthAdjustment, "flexPoints", code)}` : `0 ${calculationUnits[code].flexPoints} (${calculationCopy[code].noLengthAdjustment})` },
          { key: "subtotal", value: (code) => `${calculationNumber(baseFlex, code)} ${signedTerm(styleAdjustment, "flex", code)} ${signedTerm(ageAdjustment, "flex", code)} ${signedTerm(skillAdjustment, "flex", code)} ${signedTerm(heightAdjustment, "flex", code)} ${signedTerm(lengthAdjustment, "flex", code)} = ${calculationNumber(adjustedFlex, code)}` },
          { key: "final", value: (code) => `max(5, round(${calculationNumber(adjustedFlex, code)} ÷ 5) × 5) = ${calculationNumber(flex, code)}; ${calculationNumber(Math.max(5, flex - 5), code)}–${calculationNumber(flex + 5, code)}` },
          { key: "baseline", value: (code) => `${calculationNumber(baseFlex, code)} → ${calculationNumber(roundToFive(baseFlex), code)}` }
        ]
      };
      lastCalculationReport = { kind: "flex", report: flexReport };
      renderCalculationReport("flex", flexReport);
      $("flex-number").textContent = flex;
      $("flex-range").textContent = `${Math.max(5, flex - 5)}–${flex + 5}`;
      if ($("flex-length-message")) {
        $("flex-length-message").textContent = finalLengthCm >= 90 && finalLengthCm <= 230 ? resultMessage({
          en: lengthAdjustment > 0 ? `Your ${finalLengthCm} cm final length means a shorter shaft is likely to feel stiffer; the estimate includes roughly ${lengthAdjustment} flex points for cutting.` : lengthAdjustment < 0 ? `At ${finalLengthCm} cm, the final shaft is longer than the 152 cm reference, so the estimate is adjusted about ${Math.abs(lengthAdjustment)} flex points softer.` : `At ${finalLengthCm} cm, this length is close to the 152 cm reference used for the starting estimate.`,
          sv: lengthAdjustment > 0 ? `Din slutliga längd på ${finalLengthCm} cm gör att ett kortare skaft sannolikt känns styvare. Uppskattningen innehåller ungefär ${lengthAdjustment} flexenheter för kapningen.` : lengthAdjustment < 0 ? `Med ${finalLengthCm} cm är skaftet längre än referensmåttet 152 cm, så uppskattningen justeras ungefär ${Math.abs(lengthAdjustment)} flexenheter mjukare.` : `Med ${finalLengthCm} cm ligger längden nära referensmåttet 152 cm för startuppskattningen.`,
          fr: lengthAdjustment > 0 ? `Avec une longueur finale de ${finalLengthCm} cm, un manche plus court semblera probablement plus rigide. L’estimation comprend environ ${lengthAdjustment} points de flex pour la coupe.` : lengthAdjustment < 0 ? `À ${finalLengthCm} cm, la crosse est plus longue que la référence de 152 cm ; l’estimation est donc ajustée d’environ ${Math.abs(lengthAdjustment)} points de flex vers le plus souple.` : `À ${finalLengthCm} cm, cette longueur est proche de la référence de 152 cm utilisée pour l’estimation.`,
          de: lengthAdjustment > 0 ? `Bei einer endgültigen Länge von ${finalLengthCm} cm fühlt sich ein kürzerer Schaft wahrscheinlich steifer an. Die Schätzung enthält für das Kürzen etwa ${lengthAdjustment} Flex-Punkte.` : lengthAdjustment < 0 ? `Bei ${finalLengthCm} cm ist der Schaft länger als die Referenz von 152 cm; die Schätzung wird daher um etwa ${Math.abs(lengthAdjustment)} Flex-Punkte weicher angepasst.` : `Bei ${finalLengthCm} cm liegt die Länge nahe der Referenz von 152 cm für die Anfangsschätzung.`,
          no: lengthAdjustment > 0 ? `Med en sluttlengde på ${finalLengthCm} cm vil en kortere skaft sannsynligvis føles stivere. Overslaget inkluderer omtrent ${lengthAdjustment} flexpunkter for kappingen.` : lengthAdjustment < 0 ? `Med ${finalLengthCm} cm er skaftet lengre enn referansen på 152 cm, så overslaget justeres omtrent ${Math.abs(lengthAdjustment)} flexpunkter mykere.` : `Med ${finalLengthCm} cm ligger lengden nær referansen på 152 cm.`,
          da: lengthAdjustment > 0 ? `Med en sluttlængde på ${finalLengthCm} cm vil en kortere skaft sandsynligvis føles stivere. Skønnet indeholder cirka ${lengthAdjustment} flexpoint for afkortningen.` : lengthAdjustment < 0 ? `Med ${finalLengthCm} cm er skaftet længere end reference på 152 cm, så skønnet justeres cirka ${Math.abs(lengthAdjustment)} flexpoint blødere.` : `Med ${finalLengthCm} cm ligger længden tæt på reference på 152 cm.`,
          fi: lengthAdjustment > 0 ? `Kun lopullinen pituus on ${finalLengthCm} cm, lyhyempi varsi tuntuu todennäköisesti jäykemmältä. Arvio sisältää noin ${lengthAdjustment} flexpistettä lyhentämisen vuoksi.` : lengthAdjustment < 0 ? `Kun pituus on ${finalLengthCm} cm, varsi on pidempi kuin 152 cm:n vertailupituus, joten arvioa muutetaan noin ${Math.abs(lengthAdjustment)} flexpistettä pehmeämmäksi.` : `Pituus ${finalLengthCm} cm on lähellä lähtöarvion 152 cm:n vertailupituutta.`
        }) : "";
      }
      const messages = age === "youth" ? {
        en: "This softer range should be easier to load for a developing player. Prioritize comfort and clean contact.",
        sv: "Det här mjukare intervallet bör vara lättare att belasta för en spelare under utveckling. Prioritera komfort och rena träffar.",
        fr: "Cette plage plus souple devrait être plus facile à charger pour un joueur en développement. Privilégiez le confort et un contact propre.",
        de: "Dieser weichere Bereich lässt sich für Spieler in der Entwicklung leichter laden. Bevorzuge Komfort und sauberen Kontakt.",
        no: "Dette mykere intervallet bør være lettere å belaste for en spiller i utvikling. Prioriter komfort og gode treff.",
        da: "Dette blødere interval bør være lettere at belaste for en spiller i udvikling. Prioritér komfort og rene træf.",
        fi: "Tämä pehmeämpi alue on helpompi ladata kehittyvälle pelaajalle. Panosta mukavuuteen ja puhtaisiin osumiin."
      } : skill === "beginner" ? {
        en: "This forgiving starting point should help you learn to load the shaft without forcing your shot.",
        sv: "Den här förlåtande startpunkten hjälper dig att lära dig belasta skaftet utan att forcera skottet.",
        fr: "Ce point de départ tolérant aide à charger le manche sans forcer le tir.",
        de: "Dieser gutmütige Ausgangspunkt hilft dir, den Schaft zu laden, ohne den Schuss zu erzwingen.",
        no: "Dette tilgivende utgangspunktet hjelper deg å lære å belaste skaftet uten å tvinge skuddet.",
        da: "Dette tilgivende udgangspunkt hjælper dig med at belaste skaftet uden at forcere skuddet.",
        fi: "Tämä anteeksiantava lähtökohta auttaa lataamaan vartta ilman väkisin tehtyä laukausta."
      } : {
        en: "This balanced starting point is designed to support release, accuracy and puck feel.",
        sv: "Den här balanserade startpunkten är utformad för skott, precision och puckkänsla.",
        fr: "Ce point de départ équilibré favorise le déclenchement, la précision et le contrôle du palet.",
        de: "Dieser ausgewogene Ausgangspunkt unterstützt Release, Genauigkeit und Puckgefühl.",
        no: "Dette balanserte utgangspunktet støtter release, presisjon og puckfølelse.",
        da: "Dette balancerede udgangspunkt understøtter release, præcision og puckfornemmelse.",
        fi: "Tämä tasapainoinen lähtökohta tukee laukaisua, tarkkuutta ja kiekon tuntumaa."
      };
      $("flex-message").textContent = resultMessage(messages);
    });
  }

  if (document.body.dataset.page === "length" && $("length-form")) {
    $("length-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const height = Number($("height-cm").value) / 2.54;
      const category = $("length-age").value;
      const position = $("length-position").value;
      const skates = $("length-skates").value;
      const ageOffset = category === "youth" ? 8 : category === "junior" ? 9 : 10;
      const footwearAdjustment = skates === "off" ? -1.5 : 0;
      const positionAdjustment = position === "defense" ? 2 : position === "goalie" ? -1 : 0;
      const lengthBeforeRounding = height - ageOffset + footwearAdjustment + positionAdjustment;
      const recommended = Math.max(30, Math.round(lengthBeforeRounding));
      const recommendedCm = Math.round(recommended * 2.54);
      const rangeMinCm = Math.round((recommended - 2) * 2.54);
      const rangeMaxCm = Math.round((recommended + 2) * 2.54);
      const lengthReport = {
        inputs: [
          { key: "height", getValue: () => `${$("height-cm").value} cm (${calculationNumber(height)} in)` },
          { key: "footwear", getValue: () => calculationOption("length-skates") },
          { key: "age", getValue: () => calculationOption("length-age") },
          { key: "position", getValue: () => calculationOption("length-position") }
        ],
        steps: [
          { key: "conversion", value: (code) => `${$("height-cm").value} cm ÷ 2.54 = ${calculationNumber(height, code)} ${calculationUnit("inch", height, code)}` },
          { key: "age", value: (code) => `−${ageOffset} ${calculationUnit("inch", ageOffset, code)} (${calculationOption("length-age", code)})` },
          { key: "footwear", value: (code) => signedValue(footwearAdjustment, "inch", code) },
          { key: "position", value: (code) => signedValue(positionAdjustment, "inch", code) },
          { key: "subtotal", value: (code) => `${calculationNumber(height, code)} ${signedTerm(-ageOffset, "inch", code)} ${signedTerm(footwearAdjustment, "inch", code)} ${signedTerm(positionAdjustment, "inch", code)} = ${calculationNumber(lengthBeforeRounding, code)} ${calculationUnit("inch", lengthBeforeRounding, code)}` },
          { key: "final", value: (code) => `max(30, round(${calculationNumber(lengthBeforeRounding, code)})) = ${calculationNumber(recommended, code)} ${calculationUnit("inch", recommended, code)}` },
          { key: "centimeters", value: (code) => `round(${recommended} × 2.54) = ${calculationNumber(recommendedCm, code)} cm` },
          { key: "band", value: (code) => `${calculationNumber(rangeMinCm, code)}–${calculationNumber(rangeMaxCm, code)} cm` }
        ]
      };
      lastCalculationReport = { kind: "length", report: lengthReport };
      renderCalculationReport("length", lengthReport);
      $("length-number").textContent = recommendedCm;
      $("length-number").parentElement.lastChild.textContent = " cm";
      $("length-range").textContent = `${rangeMinCm}–${rangeMaxCm} cm`;
      if ($("length-flex-link")) {
        $("length-flex-link").href = `../flex-calculator/?length=${Math.round(recommended * 2.54)}&age=${encodeURIComponent(category)}`;
      }
      if ($("length-flex-note")) {
        $("length-flex-note").textContent = resultMessage({
          en: "Your final length affects flex: shortening a shaft makes it feel stiffer, so use this measurement when choosing a flex.",
          sv: "Din slutliga längd påverkar flexen: ett kortare skaft känns styvare, så använd måttet när du väljer flex.",
          fr: "Votre longueur finale influence le flex : raccourcir le manche le rend plus rigide, utilisez donc cette mesure pour choisir le flex.",
          de: "Deine endgültige Länge beeinflusst den Flex: Ein kürzerer Schaft fühlt sich steifer an, berücksichtige dieses Maß daher bei der Flexwahl.",
          no: "Sluttlengden påvirker flexen: en kortere skaft føles stivere, så bruk dette målet når du velger flex.",
          da: "Din sluttlængde påvirker flexen: en kortere skaft føles stivere, så brug målet, når du vælger flex.",
          fi: "Lopullinen pituus vaikuttaa flexiin: lyhyempi varsi tuntuu jäykemmältä, joten käytä mittaa flexiä valittaessa."
        });
      }
      $("length-message").textContent = resultMessage({
        en: position === "defense" ? "This slightly longer starting point adds reach for poke checks and passing while keeping a comfortable stance." : "This is measured for a natural skating stance. Confirm the blade sits flat before cutting.",
        sv: position === "defense" ? "Den här något längre startpunkten ger bättre räckvidd för petningar och passningar med en bekväm hållning." : "Det här måttet är anpassat för en naturlig skridskohållning. Kontrollera att klubbans blad ligger plant mot isen före kapning.",
        fr: position === "defense" ? "Ce point de départ légèrement plus long offre plus de portée pour les poke-checks et les passes, tout en gardant une posture confortable." : "Cette mesure correspond à une posture naturelle sur les patins. Vérifiez que la lame repose à plat avant de couper.",
        de: position === "defense" ? "Dieser etwas längere Ausgangspunkt bietet mehr Reichweite für Poke-Checks und Pässe bei bequemer Haltung." : "Dieses Maß ist für eine natürliche Haltung auf dem Eis gedacht. Prüfe vor dem Kürzen, ob die Kufe flach aufliegt.",
        no: position === "defense" ? "Dette litt lengre utgangspunktet gir bedre rekkevidde for poke-checker og pasninger med en komfortabel stilling." : "Dette målet er beregnet for en naturlig skøytestilling. Sjekk at køllebladet ligger flatt mot isen før du kapper.",
        da: position === "defense" ? "Dette lidt længere udgangspunkt giver ekstra rækkevidde til poke-checks og afleveringer i en behagelig stilling." : "Målet er beregnet til en naturlig skøjteløbsstilling. Kontrollér, at køllebladet ligger fladt mod isen før afkortning.",
        fi: position === "defense" ? "Tämä hieman pidempi lähtökohta antaa lisää ulottuvuutta riistoihin ja syöttöihin mukavassa asennossa." : "Mitta on tarkoitettu luonnolliseen luisteluasentoon. Tarkista, että lapa osuu tasaisesti jäähän ennen lyhentämistä."
      });
    });
  }

  if (document.body.dataset.page === "sharpening" && $("sharpening-form")) {
    $("sharpening-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const enteredWeight = Number($("skate-weight").value);
      const weightUnit = $("skate-unit").value;
      const weight = weightUnit === "kg" ? enteredWeight * 2.20462 : enteredWeight;
      const level = $("skate-level").value;
      const ice = $("ice-condition").value;
      const preference = $("skate-preference").value;
      const weightAdjustment = weight < 120 ? 0.125 : weight > 210 ? -0.125 : 0;
      const skillAdjustment = ["beginner", "youth"].includes(level) ? 0.125 : level === "competitive" ? -0.125 : 0;
      const iceAdjustment = ice === "hard" ? 0.125 : ice === "soft" ? -0.125 : 0;
      const preferenceAdjustment = preference === "grip" ? -0.125 : preference === "glide" ? 0.125 : 0;
      const hollowBeforeClamp = 0.625 + weightAdjustment + skillAdjustment + iceAdjustment + preferenceAdjustment;
      const hollow = Math.min(0.875, Math.max(0.375, hollowBeforeClamp));
      const bandMinimum = Math.max(0.375, hollow - 0.125);
      const bandMaximum = Math.min(0.875, hollow + 0.125);
      const labels = { 0.375: '3/8" (9 mm)', 0.5: '1/2" (13 mm)', 0.625: '5/8" (16 mm)', 0.75: '3/4" (19 mm)', 0.875: '7/8" (22 mm)' };
      const sharpeningReport = {
        inputs: [
          { key: "weight", getValue: () => `${enteredWeight} ${weightUnit} (${calculationNumber(weight)} lb)` },
          { key: "skill", getValue: () => calculationOption("skate-level") },
          { key: "ice", getValue: () => calculationOption("ice-condition") },
          { key: "preference", getValue: () => calculationOption("skate-preference") }
        ],
        steps: [
          { key: "base", value: (code) => `5/8 ${calculationUnit("inch", 0.625, code)} = ${calculationNumber(0.625, code)} ${calculationUnit("inch", 0.625, code)}` },
          { key: "weight", value: (code) => `${calculationNumber(weight, code)} lb: ${signedValue(weightAdjustment, "inch", code)}` },
          { key: "skill", value: (code) => signedValue(skillAdjustment, "inch", code) },
          { key: "ice", value: (code) => signedValue(iceAdjustment, "inch", code) },
          { key: "preference", value: (code) => signedValue(preferenceAdjustment, "inch", code) },
          { key: "subtotal", value: (code) => `${calculationNumber(0.625, code)} ${signedTerm(weightAdjustment, "inch", code)} ${signedTerm(skillAdjustment, "inch", code)} ${signedTerm(iceAdjustment, "inch", code)} ${signedTerm(preferenceAdjustment, "inch", code)} = ${calculationNumber(hollowBeforeClamp, code)} ${calculationUnit("inch", hollowBeforeClamp, code)}` },
          { key: "final", value: (code) => `min(0.875, max(0.375, ${calculationNumber(hollowBeforeClamp, code)})) = ${calculationNumber(hollow, code)} ${calculationUnit("inch", hollow, code)}` },
          { key: "band", value: () => `${labels[bandMinimum]}–${labels[bandMaximum]}` }
        ]
      };
      lastCalculationReport = { kind: "sharpening", report: sharpeningReport };
      renderCalculationReport("sharpening", sharpeningReport);
      $("hollow-number").textContent = formatHollowUnits(labels[hollow]);
      $("hollow-message").textContent = formatHollowUnits(resultMessage({
        en: hollow <= 0.5 ? "This deeper hollow gives more bite for stops and quick turns, but it can feel slower on straight-line glide." : hollow >= 0.75 ? "This shallow hollow prioritizes glide and lower drag, but it asks for confident edge control." : "This balanced hollow is a sensible standard starting point for grip and glide.",
        sv: hollow <= 0.5 ? "Den här djupare skålradien ger bättre grepp i stopp och snabba svängar, men kan kännas långsammare i rak glidning." : hollow >= 0.75 ? "Den här grundare skålradien prioriterar glid och mindre motstånd, men kräver säker kantkontroll." : "Den här balanserade skålradien är en bra standardstart för grepp och glid.",
        fr: hollow <= 0.5 ? "Ce rayon plus creux offre davantage d’accroche dans les arrêts et les virages rapides, mais peut ralentir la glisse en ligne droite." : hollow >= 0.75 ? "Ce rayon peu creux privilégie la glisse et réduit la résistance, mais demande un bon contrôle des carres." : "Ce rayon équilibré constitue un bon point de départ standard entre accroche et glisse.",
        de: hollow <= 0.5 ? "Dieser tiefere Hohlschliff bietet mehr Biss bei Stopps und schnellen Kurven, kann aber beim geraden Gleiten langsamer wirken." : hollow >= 0.75 ? "Dieser flachere Hohlschliff begünstigt Gleiten und weniger Widerstand, verlangt aber sichere Kantenkontrolle." : "Dieser ausgewogene Hohlschliff ist ein sinnvoller Standard-Ausgangspunkt für Grip und Gleiten.",
        no: hollow <= 0.5 ? "Denne dypere slipeprofilen gir mer bitt i stopp og raske svinger, men kan føles tregere ved rett glid." : hollow >= 0.75 ? "Denne grunnere slipeprofilen prioriterer glid og mindre motstand, men krever god kantkontroll." : "Denne balanserte slipeprofilen er et fornuftig standardutgangspunkt for grep og glid.",
        da: hollow <= 0.5 ? "Denne dybere sliberadius giver mere bid ved stop og hurtige sving, men kan føles langsommere ved ligeudglid." : hollow >= 0.75 ? "Denne fladere sliberadius prioriterer glid og mindre modstand, men kræver sikker kantkontrol." : "Denne balancerede sliberadius er et godt standardudgangspunkt for greb og glid.",
        fi: hollow <= 0.5 ? "Tämä syvempi teroitusura antaa enemmän pitoa pysähdyksissä ja nopeissa käännöksissä, mutta voi hidastaa suoraa luistoa." : hollow >= 0.75 ? "Tämä matala teroitusura painottaa luistoa ja pientä vastusta, mutta vaatii varmaa terien hallintaa." : "Tämä tasapainoinen teroitusura on hyvä lähtökohta pidon ja luiston välillä."
      }));
      $("hollow-range").textContent = `${labels[bandMinimum]}–${labels[bandMaximum]}`;
    });
  }
})();
