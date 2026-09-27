import React from 'react';
import { 
  BookOpen, 
  Droplet, 
  Award, 
  ShieldCheck, 
  FlaskConical, 
  FileCheck2 
} from 'lucide-react';

export const PromptSuggestions = ({ onSelectPrompt, language = 'en' }) => {
  const suggestionsEn = [
    {
      category: "Gold & Purity",
      icon: Award,
      prompt: "How to verify 6-digit HUID code and gold hallmarking under IS 1417?",
    },
    {
      category: "Water Standards",
      icon: Droplet,
      prompt: "What are the test limits for Drinking Water under IS 10500:2012?",
    },
    {
      category: "Product Licensing",
      icon: FileCheck2,
      prompt: "How to apply for an ISI mark license (Scheme-I) on Manakonline?",
    },
    {
      category: "Electronics CRS",
      icon: BookOpen,
      prompt: "Which electronic products require Compulsory Registration Scheme (CRS)?",
    },
    {
      category: "Laboratories",
      icon: FlaskConical,
      prompt: "Where is the BIS Central Laboratory located and what tests are conducted?",
    },
    {
      category: "Consumer Verification",
      icon: ShieldCheck,
      prompt: "How do I check if an ISI mark or CM/L license is genuine on BIS Care App?",
    }
  ];

  const suggestionsHi = [
    {
      category: "हॉलमार्किंग",
      icon: Award,
      prompt: "सोने पर 6-अंकीय HUID कोड और 22K (916) शुद्धता की प्रामाणिकता कैसे जांचें?",
    },
    {
      category: "पेयजल मानक",
      icon: Droplet,
      prompt: "पीने के पानी के लिए IS 10500 मानक के क्या नियम और रासायनिक सीमाएं हैं?",
    },
    {
      category: "उत्पाद प्रमाणन",
      icon: FileCheck2,
      prompt: "Manakonline पर ISI मार्क लाइसेंस (योजना-I) के लिए आवेदन कैसे करें?",
    },
    {
      category: "इलेक्ट्रॉनिक्स",
      icon: BookOpen,
      prompt: "सीआरएस (CRS) योजना के तहत कौन-से इलेक्ट्रॉनिक उपकरण अनिवार्य हैं?",
    },
    {
      category: "प्रयोगशाला",
      icon: FlaskConical,
      prompt: "बीआईएस की मुख्य केंद्रीय प्रयोगशाला कहाँ है और वहाँ क्या परीक्षण होते हैं?",
    },
    {
      category: "उपभोक्ता जांच",
      icon: ShieldCheck,
      prompt: "BIS Care App पर असली और नकली आईएसआई मार्क की पहचान कैसे करें?",
    }
  ];

  const suggestions = language === 'hi' ? suggestionsHi : suggestionsEn;

  return (
    <div className="w-full max-w-3xl mx-auto py-2">
      <div className="flex items-center justify-between mb-2.5 px-1">
        <span className="text-xs font-bold text-slate-700">
          Suggested Inquiries
        </span>
        <span className="text-[11px] text-slate-400">
          Click any query to ask AI SATHI
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {suggestions.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              onClick={() => onSelectPrompt(item.prompt)}
              className="group flex items-start space-x-2.5 rounded border border-slate-200 bg-white p-3 text-left shadow-xs transition-colors hover:border-blue-300 hover:bg-blue-50/20"
            >
              <div className="rounded bg-slate-100 p-1.5 text-[#00529B] group-hover:bg-blue-100 shrink-0">
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-semibold text-[#00529B] block mb-0.5">
                  {item.category}
                </span>
                <p className="text-xs text-slate-700 line-clamp-2 leading-snug group-hover:text-[#00529B]">
                  {item.prompt}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
