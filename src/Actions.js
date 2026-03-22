const Actions = [
    {
        type: 'sound',
        clip: 'close_eyes.m4a',
        text: 'לילה טוב כולם, עצמו עיניים.'
    },
    {
        type: 'const_wait',
        seconds: 2,
        text: 'השהייה ל 2 שניות'
    },

    {
        card: 'painter',
        type: 'sound',
        clip: 'painter_wake_up.m4a',
        text: 'צייר התעורר, ברשותך לשים על קלף של שחקן אחר את דיסקית הסימן.'
    },
    {
        card: 'painter',
        type: 'wait',
        text: 'השהייה'
    },
    {
        card: 'painter',
        type: 'sound',
        clip: 'painter_close_eyes.m4a',
        text: 'צייר עצום את עינייך.'
    },


    {
        card: 'witch',
        type: 'sound',
        clip: 'witch_wake_up.m4a',
        text: 'מכשפות התעוררו וחפשו את שותפותיכן. אם ישנה רק מכשפה אחת במשחק היא רשאית לצפות בקלף אחד מתוך אלו הנמצאים במרכז השולחן.'
    },
    {
        card: 'witch',
        type: 'wait',
        text: 'השהייה'
    },
    {
        card: 'witch',
        type: 'sound',
        clip: 'witch_close_eyes.m4a',
        text: 'מכשפות עצמו עיניים.'
    },


    {
        card: 'wizard',
        type: 'sound',
        clip: 'wizard_wake_up.m4a',
        text: 'קוסם התעורר, ברשותך לצפות בקלף אחד מתוך אלו הנמצאים במרכז השולחן.'
    },
    {
        card: 'wizard',
        type: 'wait',
        text: 'השהייה'
    },
    {
        card: 'wizard',
        type: 'sound',
        clip: 'wizard_close_eyes.m4a',
        text: 'קוסם עצום את עינייך.'
    },


    {
        card: 'fortune_teller',
        type: 'sound',
        clip: 'fortune_teller_wake_up.m4a',
        text: 'מגידת עתידות, פיקחי את עינייך. ברשותך להציץ בקלף אחד של מי שלידך, איזה צד שאת רוצה.'
    },
    {
        card: 'fortune_teller',
        type: 'wait',
        text: 'השהייה'
    },
    {
        card: 'fortune_teller',
        type: 'sound',
        clip: 'fortune_teller_close_eyes.m4a',
        text: 'מגידת עתידות עצמי את עינייך.'
    },


    {
        card: 'troll',
        type: 'sound',
        clip: 'troll_wake_up.m4a',
        text: 'טרול התעורר, ברשותך להחליף בין קלף של שחקן אחר לבין קלף ממרכז השולחן מבלי להסתכל בהם.'
    },
    {
        card: 'troll',
        type: 'wait',
        text: 'השהייה'
    },
    {
        card: 'troll',
        type: 'sound',
        clip: 'troll_close_eyes.m4a',
        text: 'טרול עצום את עינייך.'
    },


    {
        type: 'sound',
        clip: 'all_wake_up.m4a',
        text: 'בוקר טוב כולם.'
    },
]

export default Actions;
