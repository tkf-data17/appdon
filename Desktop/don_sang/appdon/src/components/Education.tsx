import { useState } from 'react';
import { Heart, HelpCircle, Info, BookOpen, Users, Zap, Shield, Clock } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Est-ce que donner du sang fait mal ?",
    answer: "La piqûre initiale peut provoquer une légère sensation de pincement, mais elle ne dure que quelques secondes. Le reste du don est généralement indolore. La plupart des donneurs trouvent l'expérience beaucoup plus facile qu'ils ne l'imaginaient."
  },
  {
    question: "Combien de temps dure un don de sang ?",
    answer: "Le don lui-même prend environ 10-15 minutes. Avec l'enregistrement, l'examen médical et le temps de repos après le don, prévoyez environ 45 minutes au total."
  },
  {
    question: "Puis-je donner si je prends des médicaments ?",
    answer: "Cela dépend du médicament et de la raison pour laquelle vous le prenez. Certains médicaments courants sont acceptables. Il est important de le mentionner lors de l'examen pré-don."
  },
  {
    question: "À quelle fréquence puis-je donner ?",
    answer: "Vous pouvez donner votre sang tous les 3 mois (90 jours). Cet intervalle permet à votre corps de reconstituer complètement les globules rouges donnés."
  },
  {
    question: "Que se passe-t-il après mon don ?",
    answer: "Votre corps commence immédiatement à remplacer le liquide perdu. Le plasma est remplacé en 24 heures, les globules rouges en 4-6 semaines. Buvez beaucoup d'eau et évitez les efforts intenses pendant 24 heures."
  },
  {
    question: "Mon sang sera-t-il testé ?",
    answer: "Oui, chaque don est testé pour diverses maladies infectieuses, incluant le VIH, l'hépatite B et C, et la syphilis. Vous serez contacté si un problème est détecté."
  }
];

const myths = [
  {
    myth: "Donner du sang affaiblit le corps",
    reality: "Faux. Votre corps reconstitue le volume sanguin en 24-48h et les globules rouges en 4-6 semaines. Les donneurs réguliers sont en aussi bonne santé que les non-donneurs.",
    icon: "💪"
  },
  {
    myth: "On peut attraper des maladies en donnant",
    reality: "Faux. Le matériel utilisé est stérile, à usage unique et jeté après chaque don. Il est impossible de contracter une maladie en donnant du sang.",
    icon: "🛡️"
  },
  {
    myth: "Je peux être remplacé par du sang artificiel",
    reality: "Faux. Le sang ne peut pas être fabriqué artificiellement. Seule la générosité des donneurs peut répondre aux besoins. Votre don est irremplaçable.",
    icon: "🩸"
  },
  {
    myth: "Mon groupe sanguin n'est pas demandé",
    reality: "Faux. Tous les groupes sanguins sont nécessaires. Les besoins varient selon les situations d'urgence et les patients.",
    icon: "🔄"
  }
];

export function Education() {
  const [activeTab, setActiveTab] = useState<'why' | 'process' | 'myths' | 'faq'>('why');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-500 to-red-700 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2>Sensibilisation</h2>
              <p className="text-sm opacity-90">Tout savoir sur le don de sang</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('why')}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
              activeTab === 'why'
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Pourquoi donner
          </button>
          <button
            onClick={() => setActiveTab('process')}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
              activeTab === 'process'
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Le processus
          </button>
          <button
            onClick={() => setActiveTab('myths')}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
              activeTab === 'myths'
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Mythes & Réalités
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
              activeTab === 'faq'
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            FAQ
          </button>
        </div>
      </div>

      <div className="px-4 pb-6">
        {/* Why Donate Tab */}
        {activeTab === 'why' && (
          <div className="space-y-4">
            {/* Hero Impact */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-6 text-center">
              <div className="text-6xl mb-3">❤️</div>
              <h3 className="text-red-900 mb-2">1 don = 3 vies sauvées</h3>
              <p className="text-red-800">
                Chaque don de sang peut être séparé en plusieurs composants (globules rouges, plasma, plaquettes) et aider jusqu'à trois patients différents.
              </p>
            </div>

            {/* Reasons Grid */}
            <div className="space-y-3">
              <h3 className="text-gray-900">Pourquoi votre don est crucial</h3>
              
              <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 mb-1">Urgences vitales</h4>
                    <p className="text-sm text-gray-700">
                      Accidents de la route, accouchements difficiles, interventions chirurgicales urgentes : chaque jour au Togo, des vies dépendent de la disponibilité du sang.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 mb-1">Maladies chroniques</h4>
                    <p className="text-sm text-gray-700">
                      Les patients souffrant de drépanocytose, de cancer ou d'autres maladies chroniques nécessitent des transfusions régulières pour survivre.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 mb-1">Santé maternelle</h4>
                    <p className="text-sm text-gray-700">
                      Les complications lors de l'accouchement sont une cause majeure de besoin en sang. Votre don peut sauver une mère et son bébé.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 mb-1">Aucun substitut</h4>
                    <p className="text-sm text-gray-700">
                      Le sang ne peut pas être fabriqué artificiellement. La seule source reste la générosité des donneurs volontaires.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h4 className="text-blue-900 mb-3">📊 Au Togo</h4>
              <div className="space-y-2 text-sm text-blue-800">
                <p>• Seulement <strong>2-3%</strong> de la population donne régulièrement son sang</p>
                <p>• Les besoins augmentent de <strong>10% chaque année</strong></p>
                <p>• Les stocks sont souvent critiques, particulièrement pour les groupes rares</p>
                <p>• Chaque minute compte lors des urgences</p>
              </div>
            </div>
          </div>
        )}

        {/* Process Tab */}
        {activeTab === 'process' && (
          <div className="space-y-4">
            <h3 className="text-gray-900">Les étapes du don de sang</h3>

            {/* Timeline */}
            <div className="space-y-4">
              {[
                {
                  step: 1,
                  title: "Inscription et questionnaire",
                  duration: "5-10 min",
                  description: "Remplissez un questionnaire médical confidentiel pour vérifier votre éligibilité. Munissez-vous d'une pièce d'identité.",
                  icon: "📋"
                },
                {
                  step: 2,
                  title: "Entretien médical",
                  duration: "5 min",
                  description: "Un professionnel de santé vérifie votre tension, votre pouls et votre taux d'hémoglobine. C'est l'occasion de poser vos questions.",
                  icon: "👨‍⚕️"
                },
                {
                  step: 3,
                  title: "Le don",
                  duration: "10-15 min",
                  description: "Installez-vous confortablement. On prélève environ 450 ml de sang. Le matériel est stérile et à usage unique.",
                  icon: "🩸"
                },
                {
                  step: 4,
                  title: "Collation et repos",
                  duration: "15 min",
                  description: "Détendez-vous et profitez d'une collation offerte. Il est important de bien s'hydrater et de se reposer quelques minutes.",
                  icon: "🥤"
                }
              ].map((item) => (
                <div key={item.step} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xl">
                      {item.step}
                    </div>
                    {item.step < 4 && <div className="w-0.5 h-full bg-red-200 mt-2" />}
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-gray-900">{item.title}</h4>
                        <span className="text-2xl">{item.icon}</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{item.description}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Clock className="w-3 h-3" />
                        <span>{item.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Preparation Tips */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <h4 className="text-green-900 mb-3">✅ Bien se préparer</h4>
              <div className="space-y-2 text-sm text-green-800">
                <p><strong>Avant le don :</strong></p>
                <ul className="ml-4 space-y-1">
                  <li>• Dormez suffisamment la nuit précédente</li>
                  <li>• Prenez un repas normal (évitez les aliments trop gras)</li>
                  <li>• Buvez beaucoup d'eau (au moins 500 ml)</li>
                  <li>• Apportez une pièce d'identité</li>
                </ul>
                <p className="pt-2"><strong>Après le don :</strong></p>
                <ul className="ml-4 space-y-1">
                  <li>• Évitez les efforts physiques intenses pendant 24h</li>
                  <li>• Continuez à bien vous hydrater</li>
                  <li>• Gardez le pansement quelques heures</li>
                  <li>• En cas de malaise, contactez le centre</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Myths Tab */}
        {activeTab === 'myths' && (
          <div className="space-y-4">
            <h3 className="text-gray-900">Mythes et réalités sur le don de sang</h3>
            
            {myths.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
                <div className="flex items-start gap-3">
                  <span className="text-3xl flex-shrink-0">{item.icon}</span>
                  <div className="flex-1">
                    <div className="bg-red-50 border-l-4 border-red-600 rounded p-3 mb-3">
                      <p className="text-sm">
                        <span className="font-semibold text-red-900">MYTHE : </span>
                        <span className="text-red-800">{item.myth}</span>
                      </p>
                    </div>
                    <div className="bg-green-50 border-l-4 border-green-600 rounded p-3">
                      <p className="text-sm">
                        <span className="font-semibold text-green-900">RÉALITÉ : </span>
                        <span className="text-green-800">{item.reality}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Additional Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h4 className="text-blue-900 mb-2">💡 Le saviez-vous ?</h4>
              <div className="space-y-2 text-sm text-blue-800">
                <p>• Votre corps produit environ <strong>2 millions</strong> de globules rouges chaque seconde</p>
                <p>• Le volume de sang donné est reconstitué en <strong>24-48 heures</strong></p>
                <p>• Vous avez environ <strong>5 litres</strong> de sang dans votre corps</p>
                <p>• Un don de sang ne représente que <strong>8%</strong> de votre volume sanguin total</p>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <div className="space-y-4">
            <h3 className="text-gray-900">Questions fréquentes</h3>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    className="w-full p-4 flex items-start gap-3 text-left hover:bg-gray-50 transition"
                  >
                    <HelpCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="text-gray-900">{faq.question}</h4>
                    </div>
                    <div className={`transform transition-transform ${expandedFAQ === index ? 'rotate-180' : ''}`}>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  {expandedFAQ === index && (
                    <div className="px-4 pb-4">
                      <div className="pl-8 pr-8">
                        <p className="text-sm text-gray-700">{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Contact CTA */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-red-900 mb-1">Vous avez d'autres questions ?</h4>
                  <p className="text-sm text-red-800 mb-3">
                    Notre équipe est là pour vous répondre et vous accompagner dans votre démarche de don.
                  </p>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm">
                    Nous contacter
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
