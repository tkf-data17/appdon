import { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  type: 'boolean' | 'number';
  disqualifies?: boolean;
  min?: number;
  max?: number;
}

const questions: Question[] = [
  {
    id: 'age',
    question: 'Quel est votre âge ?',
    type: 'number',
    min: 18,
    max: 65
  },
  {
    id: 'weight',
    question: 'Quel est votre poids (en kg) ?',
    type: 'number',
    min: 50
  },
  {
    id: 'sick',
    question: 'Êtes-vous actuellement malade ou fiévreux ?',
    type: 'boolean',
    disqualifies: true
  },
  {
    id: 'medications',
    question: 'Prenez-vous actuellement des médicaments importants ?',
    type: 'boolean'
  },
  {
    id: 'pregnancy',
    question: 'Êtes-vous enceinte ou allaitez-vous ?',
    type: 'boolean',
    disqualifies: true
  },
  {
    id: 'recent_donation',
    question: 'Avez-vous fait un don de sang dans les 3 derniers mois ?',
    type: 'boolean',
    disqualifies: true
  },
  {
    id: 'surgery',
    question: 'Avez-vous subi une opération chirurgicale dans les 6 derniers mois ?',
    type: 'boolean',
    disqualifies: true
  },
  {
    id: 'tattoo',
    question: 'Avez-vous fait un tatouage ou un piercing dans les 4 derniers mois ?',
    type: 'boolean',
    disqualifies: true
  }
];

export function Eligibility() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: any }>({});
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentStep];
  const isLastQuestion = currentStep === questions.length - 1;

  const handleAnswer = (value: any) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (isLastQuestion) {
      setShowResults(true);
    } else {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 300);
    }
  };

  const checkEligibility = () => {
    // Check age
    if (answers.age < 18 || answers.age > 65) {
      return { eligible: false, reason: 'Vous devez avoir entre 18 et 65 ans pour donner votre sang.' };
    }

    // Check weight
    if (answers.weight < 50) {
      return { eligible: false, reason: 'Vous devez peser au moins 50 kg pour donner votre sang.' };
    }

    // Check disqualifying answers
    for (const question of questions) {
      if (question.disqualifies && answers[question.id] === true) {
        return { eligible: false, reason: 'Une de vos réponses indique une contre-indication temporaire au don de sang.' };
      }
    }

    return { eligible: true, reason: '' };
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  if (showResults) {
    const result = checkEligibility();

    return (
      <div className="p-4">
        <div className="max-w-2xl mx-auto">
          {result.eligible ? (
            <div className="bg-green-50 border-2 border-green-300 rounded-2xl p-6 text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-green-900 mb-2">Vous êtes éligible ! 🎉</h2>
              <p className="text-green-800 mb-6">
                Félicitations ! Vous pouvez faire un don de sang. Votre geste peut sauver jusqu'à 3 vies.
              </p>
              <div className="space-y-3">
                <button className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition">
                  Prendre rendez-vous maintenant
                </button>
                <button
                  onClick={resetQuiz}
                  className="w-full bg-white text-green-600 py-3 rounded-xl border border-green-600 hover:bg-green-50 transition"
                >
                  Refaire le test
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-orange-50 border-2 border-orange-300 rounded-2xl p-6 text-center">
              <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-orange-900 mb-2">Non éligible actuellement</h2>
              <p className="text-orange-800 mb-6">
                {result.reason}
              </p>
              <div className="bg-white rounded-xl p-4 mb-6 text-left">
                <h3 className="text-orange-900 mb-2">💡 Bon à savoir</h3>
                <p className="text-sm text-orange-800">
                  La plupart des contre-indications sont temporaires. N'hésitez pas à refaire ce test dans quelques semaines ou à contacter un centre de don pour plus d'informations.
                </p>
              </div>
              <button
                onClick={resetQuiz}
                className="w-full bg-orange-600 text-white py-3 rounded-xl hover:bg-orange-700 transition"
              >
                Refaire le test
              </button>
            </div>
          )}

          {/* Information Cards */}
          <div className="mt-6 space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h3 className="text-blue-900 mb-2">📋 Conditions générales</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Âge : 18-65 ans</li>
                <li>• Poids : minimum 50 kg</li>
                <li>• Intervalle entre dons : 3 mois minimum</li>
                <li>• Bonne santé générale</li>
              </ul>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <h3 className="text-purple-900 mb-2">⏰ Contre-indications temporaires</h3>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Maladie ou fièvre : attendre la guérison</li>
                <li>• Tatouage/Piercing : attendre 4 mois</li>
                <li>• Chirurgie : attendre 6 mois</li>
                <li>• Grossesse/Allaitement</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-900">Test d'éligibilité</h3>
            <span className="text-sm text-gray-600">
              {currentStep + 1} / {questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-red-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 mb-6">
          <div className="mb-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-red-600 font-bold">{currentStep + 1}</span>
              </div>
              <h2 className="text-gray-900 mt-1">{currentQuestion.question}</h2>
            </div>
          </div>

          {currentQuestion.type === 'boolean' ? (
            <div className="space-y-3">
              <button
                onClick={() => handleAnswer(false)}
                className="w-full p-4 rounded-xl border-2 border-gray-300 hover:border-green-500 hover:bg-green-50 transition text-left flex items-center justify-between group"
              >
                <span className="text-gray-900">Non</span>
                <CheckCircle className="w-6 h-6 text-gray-300 group-hover:text-green-600" />
              </button>
              <button
                onClick={() => handleAnswer(true)}
                className="w-full p-4 rounded-xl border-2 border-gray-300 hover:border-red-500 hover:bg-red-50 transition text-left flex items-center justify-between group"
              >
                <span className="text-gray-900">Oui</span>
                <AlertCircle className="w-6 h-6 text-gray-300 group-hover:text-red-600" />
              </button>
            </div>
          ) : (
            <div>
              <input
                type="number"
                placeholder={currentQuestion.id === 'age' ? 'Entrez votre âge' : 'Entrez votre poids'}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value)) {
                    setAnswers({ ...answers, [currentQuestion.id]: value });
                  }
                }}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
              />
              <button
                onClick={() => {
                  if (answers[currentQuestion.id]) {
                    handleAnswer(answers[currentQuestion.id]);
                  }
                }}
                disabled={!answers[currentQuestion.id]}
                className="w-full bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Continuer
              </button>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-blue-900">
                Ce test est indicatif. Un examen médical sera effectué avant chaque don pour confirmer votre éligibilité.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        {currentStep > 0 && (
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="w-full mt-4 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
          >
            Question précédente
          </button>
        )}
      </div>
    </div>
  );
}
