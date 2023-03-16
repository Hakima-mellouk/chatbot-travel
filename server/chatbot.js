const { NlpManager } = require("node-nlp");
const { User } = require("./user");

const manager = new NlpManager({ languages: ["en","fr","es"] });
// 1 - Train the IA
async function trainChatBotIA() {
  return new Promise(async (resolve, reject) => {
     // Train also the NLG
    manager.addCorpus("corpus.json");
    manager.addCorpus("corpus-fr.json");
    manager.addCorpus("corpus-es.json");
    
    await manager.train();
    manager.save()
    console.log("AI has been trainded");
    resolve(true);
  });
}
async function generateResponseAI(qsm) {
  // Train and save the mode
  return new Promise(async (resolve, reject) => {
    // manager.process("en", qsm).then(resolve);
    // manager.process("fr", qsm).then(resolve);
    // manager.process("zh", qsm).then(resolve);
    // manager.process("es", qsm).then(resolve);
    //response = await new User(manager).onIntent(response);
    //resolve(response);

    response1 = await manager.process('en', qsm);
    response2 = await manager.process('fr', qsm);
    response3 = await manager.process('zh', qsm);
    response4 = await manager.process('es', qsm);
    
    response1 = await new User(manager).onIntent(response1);
    response2 = await new User(manager).onIntent(response2);
    response3 = await new User(manager).onIntent(response3);
    response4 = await new User(manager).onIntent(response4);

    if(response1.answer === "Sorry, I didn't quite get you. Could your paraphrase it?"){
      if(response2.answer === "Sorry, I didn't quite get you. Could your paraphrase it?"){
        if(response3.answer === "Sorry, I didn't quite get you. Could your paraphrase it?"){
 resolve(response4);
        }else if(response4.answer === "Sorry, I didn't quite get you. Could your paraphrase it?"){
          resolve(respons3);
        }
      }else{
        resolve(response2);
      }
    }else {
      resolve(response1);
    }

  });
}

module.exports = {
  trainChatBotIA,
  generateResponseAI,
};

