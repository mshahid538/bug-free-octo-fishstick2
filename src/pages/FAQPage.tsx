import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
}

const FAQPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const faqData: FAQItem[] = [
    {
      id: '1',
      question: 'What is the Lab Dashboard system?',
      answer: 'The Lab Dashboard is a comprehensive platform designed to help laboratories track their environmental impact, manage memberships, and implement sustainable practices. It provides tools for monitoring energy usage, carbon emissions, and offers personalized recommendations for reducing environmental footprint.',
      category: 'General',
      tags: ['dashboard', 'overview', 'platform']
    },
    {
      id: '2',
      question: 'How do I join a laboratory?',
      answer: 'To join a laboratory, navigate to the Dashboard page and browse available laboratories. Click on "Join Lab" for any laboratory you\'re interested in. You\'ll need to complete a brief assessment questionnaire before your membership is confirmed.',
      category: 'Membership',
      tags: ['join', 'laboratory', 'membership', 'process']
    },
    {
      id: '3',
      question: 'What is the laboratory assessment for?',
      answer: 'The laboratory assessment helps us understand your lab\'s current practices and equipment usage. Based on your answers, we provide personalized recommendations for reducing energy consumption and environmental impact. The assessment covers monitor usage, freezer operations, and other energy-intensive equipment.',
      category: 'Assessment',
      tags: ['assessment', 'recommendations', 'energy', 'sustainability']
    },
    {
      id: '4',
      question: 'How are energy usage and emissions calculated?',
      answer: 'Our calculations are based on industry-standard models that consider equipment specifications, usage patterns, and operational parameters. We use established conversion factors for different types of laboratory equipment and their typical energy consumption patterns.',
      category: 'Calculations',
      tags: ['energy', 'emissions', 'calculation', 'methodology']
    },
    {
      id: '5',
      question: 'Can I leave a laboratory after joining?',
      answer: 'Yes, you can leave a laboratory at any time by clicking the "Leave Lab" button on the laboratory card in your dashboard. Your assessment data will be retained for historical analysis but will no longer be actively used for recommendations.',
      category: 'Membership',
      tags: ['leave', 'laboratory', 'membership', 'data']
    },
    {
      id: '6',
      question: 'What recommendations do you provide?',
      answer: 'Our recommendations are tailored based on your assessment responses and may include suggestions for reducing monitor usage, optimizing freezer temperatures, implementing energy-efficient practices, and adopting sustainable laboratory protocols.',
      category: 'Recommendations',
      tags: ['recommendations', 'sustainability', 'efficiency', 'practices']
    },
    {
      id: '7',
      question: 'Is my data secure and private?',
      answer: 'Yes, we take data security and privacy seriously. All data is encrypted in transit and at rest. We follow industry-standard security practices and comply with relevant data protection regulations. Your personal information is never shared with third parties without your explicit consent.',
      category: 'Privacy',
      tags: ['privacy', 'security', 'data', 'protection']
    },
    {
      id: '8',
      question: 'How often should I update my assessment?',
      answer: 'We recommend updating your assessment whenever there are significant changes to your laboratory setup, equipment, or practices. This ensures that our recommendations remain relevant and accurate. You can update your assessment at any time through the dashboard.',
      category: 'Assessment',
      tags: ['update', 'assessment', 'frequency', 'changes']
    },
    {
      id: '9',
      question: 'What if I have multiple laboratories?',
      answer: 'You can join multiple laboratories and manage them all from your dashboard. Each laboratory will have its own assessment and recommendations. You can switch between laboratories and view their individual environmental impact data.',
      category: 'Membership',
      tags: ['multiple', 'laboratories', 'management', 'dashboard']
    },
    {
      id: '10',
      question: 'How can I contact support?',
      answer: 'You can contact our support team through the help section in your dashboard or by emailing support@labdashboard.com. We typically respond within 24 hours and are available to help with any questions or technical issues.',
      category: 'Support',
      tags: ['support', 'contact', 'help', 'technical']
    }
  ];

  const categories = ['all', ...Array.from(new Set(faqData.map(item => item.category)))];

  const filteredFAQs = useMemo(() => {
    return faqData.filter(item => {
      const matchesSearch = searchTerm === '' || 
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="navbar bg-base-100 shadow-lg">
        <div className="flex-1">
          <Link to="/dashboard" className="btn btn-ghost text-xl">
            Lab Dashboard
          </Link>
        </div>
        <div className="flex-none">
          <Link to="/dashboard" className="btn btn-ghost">
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-base-content mb-2">
            Frequently Asked Questions
          </h1>
          <p className="text-base-content/70">
            Find answers to common questions.
          </p>
        </div>

        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <label className="label">
                  <span className="label-text font-medium">Search Questions</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search questions, answers, or tags..."
                    className="input input-bordered w-full pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-content/50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              <div className="lg:w-64">
                <label className="label">
                  <span className="label-text font-medium">Category</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 text-sm text-base-content/70">
              Showing {filteredFAQs.length} of {faqData.length} questions
              {searchTerm && (
                <span> for "{searchTerm}"</span>
              )}
              {selectedCategory !== 'all' && (
                <span> in {selectedCategory}</span>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">❓</div>
              <h3 className="text-xl font-semibold mb-2">No questions found</h3>
              <p className="text-base-content/70">
                Try adjusting your search terms or category filter.
              </p>
            </div>
          ) : (
            filteredFAQs.map((item) => (
              <div key={item.id} className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="card-title text-lg mb-2">{item.question}</h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="badge badge-outline">{item.category}</span>
                        {item.tags.map(tag => (
                          <span key={tag} className="badge badge-ghost text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => toggleExpanded(item.id)}
                      className="btn btn-ghost btn-sm"
                    >
                      {expandedItems.has(item.id) ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </button>
                  </div>
                  
                  {expandedItems.has(item.id) && (
                    <div className="mt-4 pt-4 border-t border-base-300">
                      <p className="text-base-content/80 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="card bg-primary text-primary-content shadow-xl mt-8">
          <div className="card-body text-center">
            <h3 className="card-title justify-center text-xl mb-2">
              Still have questions?
            </h3>
            <p className="mb-4">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="card-actions justify-center">
              <button className="btn btn-secondary">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
