/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

const GET_FRASES_MSG = "Un dato curioso es ...";
const data = {
    'es': [
        'Las mariposas saborean con sus patas.',
        'La migración de las mariposas monarca es un fenómeno asombroso.',
        'Existen más de 20,000 especies de mariposas en el mundo.',
        'Las mariposas tienen una dieta variada.',
        'Las mariposas no tienen pulmones.',
        'El color de las alas de las mariposas no siempre es resultado de pigmentación.',
        'El ciclo de vida de la mariposa consta de cuatro partes.',
        'Las mariposas pueden ver colores que los humanos no pueden.'
    ],
    'en': [
        'Butterflies taste with their feet.',
        'The migration of monarch butterflies is an amazing phenomenon.',
        'There are over 20,000 species of butterflies in the world.',
        'Butterflies have a varied diet.',
        'Butterflies do not have lungs.',
        'The color of butterfly wings is not always due to pigmentation.',
        'The life cycle of a butterfly consists of four parts.',
        'Butterflies can see colors that humans cannot.'
    ]
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
     handle(handlerInput) {
        const locale = Alexa.getLocale(handlerInput.requestEnvelope);
        const language = locale.startsWith('es') ? 'es' : 'en';
        const greeting = language === 'es' ? '¡Hola Mabel! Bienvenida a Curiosidades de las Mariposas. Puedes decir, "Dime un dato curioso sobre las mariposas."' : 
                                             'Hello Mabel! Welcome to Butterfly Facts. You can say, "Tell me a curious fact about butterflies."';
        return handlerInput.responseBuilder
            .speak(greeting)
            .reprompt(greeting)
            .getResponse();
    }
};

const FrasesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'FrasesIntent';
    },
    handle(handlerInput) {
        const locale = Alexa.getLocale(handlerInput.requestEnvelope);
        
        const language = locale.startsWith('es') ? 'es' : 'en';
        const frasesArray = data[language];
        const frasesIndice = Math.floor(Math.random() * frasesArray.length);
        const randomFrase = frasesArray[frasesIndice];
        const speakOutput = language === 'es' ? `Un dato curioso es: ${randomFrase}` : 
                                               `A curious fact is: ${randomFrase}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};




const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = locale.startsWith('es') 
            ? 'Puedes pedirme un dato curioso diciendo "Dime un dato curioso sobre las mariposas".'
            : 'You can ask me for a fun fact by saying "Tell me a fun fact about butterflies".';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
    
        const locale = handlerInput.requestEnvelope.request.locale;
        const speakOutput = locale.startsWith('es') ? '¡Adiós!' : 'Goodbye!';
        
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const locale = handlerInput.requestEnvelope.request.locale;
        const speakOutput = locale.startsWith('es') 
            ? 'Lo siento, tuve problemas para hacer lo que pediste. Por favor, inténtalo de nuevo.'
            : 'Sorry, I had trouble doing what you asked. Please try again.';
        
        console.log(`Error handled: ${error.message}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        FrasesIntentHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();