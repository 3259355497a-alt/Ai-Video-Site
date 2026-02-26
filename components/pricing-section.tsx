export function PricingSection() {
  const { t } = useTranslation();

  const plans = [
    {
      name: 'Starter',
      price: '$9.99',
      credits: '10',
      bonus: '0',
      popular: false
    },
    {
      name: 'Popular',
      price: '$19.99',
      credits: '25',
      bonus: '5',
      popular: true
    },
    {
      name: 'Pro',
      price: '$49.99',
      credits: '70',
      bonus: '20',
      popular: false
    },
    {
      name: 'Max',
      price: '$99.99',
      credits: '150',
      bonus: '50',
      popular: false
    }
  ];

  const links = {
    'Starter': 'https://john-ai.lemonsqueezy.com/checkout/buy/854047',
    'Popular': 'https://john-ai.lemonsqueezy.com/checkout/buy/854049',
    'Pro': 'https://john-ai.lemonsqueezy.com/checkout/buy/855051',
    'Max': 'https://john-ai.lemonsqueezy.com/checkout/buy/854052'
  };

  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          {t('pricing.title')}
        </h2>
        <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-6 ${
                plan.popular
                  ? 'bg-purple-600 border-2 border-purple-400 relative'
                  : 'bg-gray-900 border border-gray-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 right-4 bg-purple-400 text-black text-sm px-3 py-1 rounded-full">
                  {t('pricing.popular.badge')}
                </div>
              )}
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">
                  {plan.price}
                </span>
              </div>
              <div className="mb-6 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <span>{plan.credits} {t('pricing.credits')}</span>
                </div>
                {plan.bonus !== '0' && (
                  <div className="flex items-center gap-2 text-sm text-green-400">
                    <span>+{plan.bonus} {t('pricing.bonus')}</span>
                  </div>
                )}
              </div>
              <button
                onClick={() => window.open(links[plan.name], '_blank')}
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  plan.popular
                    ? 'bg-white text-purple-600 hover:bg-gray-100'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                {t('pricing.buy')}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
