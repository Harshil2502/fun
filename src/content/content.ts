export interface MemoryItem {
  id: string;
  title: string;
  subtitle: string;
  detail: string;
  iconType: 'chai' | 'cassette' | 'bakery' | 'book';
}

export interface CouponItem {
  id: string;
  title: string;
  description: string;
  tag: string;
  edition: string;
}

export interface MoodNote {
  id: string;
  note: string;
  folded: boolean;
}

export interface JournalContent {
  recipient: {
    name: string;
    nickname: string;
  };
  cover: {
    title: string;
    subtitle: string;
    ribbonPrompt: string;
  };
  scrapbook: {
    polaroid1: {
      caption: string;
      backNote: string;
    };
    polaroid2: {
      caption: string;
      backNote: string;
    };
    stickyNotes: Array<{
      id: string;
      text: string;
      rotation: string;
      wash: string;
    }>;
  };
  activities: {
    doodle: {
      title: string;
      description: string;
      color: string;
    };
    stars: {
      title: string;
      description: string;
      color: string;
      starCount: number;
    };
    breathing: {
      title: string;
      description: string;
      color: string;
    };
    memory: {
      title: string;
      description: string;
      color: string;
      items: MemoryItem[];
    };
    moodJar: {
      title: string;
      description: string;
      color: string;
      notes: MoodNote[];
    };
    coupons: {
      title: string;
      description: string;
      color: string;
      items: CouponItem[];
    };
  };
  envelope: {
    recipientLine: string;
    sealText: string;
    letterTitle: string;
    letterParagraphs: string[];
    calendarDate: {
      dayOfWeek: string;
      date: string;
      month: string;
      year: string;
      time: string;
      annotation: string;
    };
    signoff: {
      prompt: string;
      name: string;
    };
  };
  easterEggs: {
    cat: string;
    plant: string;
    moon: string;
  };
}

export const content: JournalContent = {
  recipient: {
    name: "Pragya",
    nickname: "Pragya",
  },

  cover: {
    title: "Thodi Si Yaadein, Pragya",
    subtitle:
      "Kuch khaane-peene ke plans, thodi bakwaas aur kuch moments jo yaad reh gaye.",
    ribbonPrompt: "Achha ji, khol ke dekho",
  },

  scrapbook: {
    polaroid1: {
      caption: "Ek Bakery, Do Bhukkad",
      backNote:
        "Nama Bakery ka brownie aur veg puff. Itna toh yaad hai. Baaki jagah pe kya-kya baatein hui thi, woh ab yaad karne baithunga toh alag hi investigation shuru ho jayegi. 😂",
    },

    polaroid2: {
      caption: "Ek Kitaab Wali Subah",
      backNote:
        "Subah ki coffee aur Gunahon Ke Devta. Jagah ka naam yaad nahi aa raha, but tujhe woh book dena yaad hai. Kuch random se moments dimaag mein reh hi jaate hain.",
    },

    stickyNotes: [
      {
        id: "note-1",
        text:
          "Ek din phir woh dosa-idli wali jagah dhoondhni padegi. Naam yaad nahi, review dena hai toh bas itna ki coffee bhi achhi thi.",
        rotation: "-1.5deg",
        wash: "var(--rb-yellow-wash)",
      },
      {
        id: "note-2",
        text:
          "Kabhi-kabhi achhe plans woh hote hain jo bas 'chal chalein?' se shuru hote hain.",
        rotation: "2.1deg",
        wash: "var(--rb-green-wash)",
      },
      {
        id: "note-3",
        text:
          "Roadside khaana, random conversations aur ghar jaake sochna ki time itni jaldi kaise nikal gaya.",
        rotation: "-0.8deg",
        wash: "var(--rb-orange-wash)",
      },
    ],
  },

  activities: {
    doodle: {
      title: "Kuch Bhi Bana De",
      description:
        "Ek doodle bana, kuch random likh, ya apni creativity dikha. Main judge nahi karunga. Shayad.",
      color: "var(--rb-violet)",
    },

    stars: {
      title: "Catch These Stars",
      description:
        "Saare stars pakad ke dikha. Wordle mein competition kaafi hai, yahan thoda easy rakhte hain.",
      color: "var(--rb-indigo)",
      starCount: 5,
    },

    breathing: {
      title: "Thoda Break Le Lo",
      description:
        "Kaam toh chalta rahega. Ek minute ruk ja, paani pee le aur phir apne kaam pe lag jaana.",
      color: "var(--rb-blue)",
    },

    memory: {
      title: "Achha, Yeh Yaad Hai?",
      description:
        "Kuch purane food plans. Dekho kitna yaad aata hai, madam.",
      color: "var(--rb-green)",

      items: [
        {
          id: "bakery",
          title: "Nama Bakery",
          subtitle: "Brownie aur veg puff",
          detail:
            "Nama Bakery ka brownie aur veg puff. Bas itni si baat, par ab jab bhi bakery ka naam aayega toh shayad yeh yaad aa jaaye. Agli baar koi nayi jagah try karenge.",
          iconType: "bakery",
        },
        {
          id: "dosa",
          title: "Woh Dosa Wali Jagah",
          subtitle: "Dosa, idli aur coffee",
          detail:
            "Place ka naam yaad nahi aa raha, par dosa, idli aur coffee teeno achhe the. Kabhi dobara mil gayi toh revisit karenge. Is baar naam bhi yaad kar lenge.",
          iconType: "chai",
        },
        {
          id: "book",
          title: "Gunahon Ke Devta",
          subtitle: "Coffee ke saath ek kitaab",
          detail:
            "Subah coffee peene gaye the aur maine tujhe Gunahon Ke Devta di thi. Place ka naam toh Google Maps bhi nahi dhoondh paayega mere dimaag se, par book wala moment yaad hai.",
          iconType: "book",
        },
        {
          id: "roadside",
          title: "Roadside Wala Plan",
          subtitle: "No fancy restaurant needed",
          detail:
            "Kabhi roadside pe ruk ke khaana, kabhi bas idhar-udhar nikal jaana. Har baar koi special plan nahi hota, aur shayad isi liye kuch plans achhe lagte hain.",
          iconType: "cassette",
        },
      ],
    },

    moodJar: {
      title: "Random Notes For You",
      description:
        "Mood achha ho ya kharaab, koi bhi note utha lena. Inmein koi life-changing advice nahi hai, relax.",
      color: "var(--rb-yellow)",

      notes: [
        {
          id: "note-a",
          note:
            "Aaj ka kaam kal bhi ho sakta hai. Haan, manager ko yeh mat bol dena.",
          folded: false,
        },
        {
          id: "note-b",
          note:
            "Tere random updates aur alag-alag stories sunna kaafi entertaining hota hai, not gonna lie.",
          folded: false,
        },
        {
          id: "note-c",
          note:
            "Kabhi plan cancel karna ho toh kar dena. Aur kabhi achanak coffee peene ka mann kare toh bata dena.",
          folded: false,
        },
        {
          id: "note-d",
          note:
            "Agli baar milenge toh koi nayi jagah try karenge. Ya phir purani wali. Dekhenge.",
          folded: false,
        },
      ],
    },

    coupons: {
      title: "Chaar Plans, Teri Marzi",
      description:
        "Inmein se koi bhi plan kabhi bhi choose kar lena. Date aur venue baad mein decide kar lenge.",
      color: "var(--rb-orange)",

      items: [
        {
          id: "c-1",
          title: "Nama Bakery: Round Two",
          description:
            "Brownie aur veg puff ka repeat. Ya phir kuch naya try karenge. Order tu decide karna, main bas company dene aa jaunga.",
          tag: "Whenever You Want",
          edition: "No. 01 / 04",
        },
        {
          id: "c-2",
          title: "Dosa Wali Jagah Dhoondho",
          description:
            "Us jagah ka naam yaad karne ki ek aur koshish. Dosa, idli aur coffee order karenge. Is baar location save bhi kar lenge, hopefully.",
          tag: "Pending Investigation",
          edition: "No. 02 / 04",
        },
        {
          id: "c-3",
          title: "Coffee & Bookshop",
          description:
            "Ek subah coffee peene chalenge, phir kisi bookshop mein ghus jayenge. Koi achhi book mili toh le lenge. Nahi mili toh bhi coffee toh hai hi.",
          tag: "Slow Morning Plan",
          edition: "No. 03 / 04",
        },
        {
          id: "c-4",
          title: "Roadside Food Adventure",
          description:
            "Koi fixed destination nahi. Jo jagah achhi lagegi wahan rukenge, kuch khaayenge aur phir decide karenge ki aage kya karna hai.",
          tag: "No Detailed Planning",
          edition: "No. 04 / 04",
        },
      ],
    },
  },

  envelope: {
    recipientLine: "For Pragya",
    sealText: "P",
    letterTitle: "Ek chhota sa note...",

    letterParagraphs: [
      "Achha ji, itna sab dekh liya tumne. Isko banate waqt realize hua ki humne abhi tak kitni random jagahon pe khaana-peena kar liya hai. Aur kitni jagahon ke naam mujhe yaad nahi hain. 😭",

      "Nama Bakery, woh dosa-idli wali jagah, subah ki coffee aur Gunahon Ke Devta... aur woh roadside food plans. Koi bahut extraordinary cheez nahi thi, bas normal se din the, but your presence made it so memorable. Aur shayad isi liye yeh yaad reh gaye. 😊",

      "Par achha lagta hai jab kisi random din ka koi chhota sa moment baad mein yaad aa jaata hai. Jaise koi gaana sunke purani baat yaad aa jaana, ya koi jagah dekh ke lagna ki yahan toh pehle bhi aaye hain.",

      "Abhi toh kaafi saari jagah explore karni baaki hain. Kuch achhi coffee places, kuch achha khaana aur obviously Wordle ka hisaab bhi barabar karna hai. Tumhari jeetne ki aadat kuch zyada hi badh rahi hai. 😂",

      "Bas, itna hi. Agli baar milenge toh koi naya plan banayenge. Ya phir bina plan ke hi nikal jayenge. Woh bhi theek hai.",
    ],

    calendarDate: {
      dayOfWeek: "Sunday",
      date: "11",
      month: "October",
      year: "2026",
      time: "6:30 PM",
      annotation: "Ek aur din, ek aur kahaani.",
    },

    signoff: {
      prompt: "Chalo, phir milte hain",
      name: "Harshil",
    },
  },

  easterEggs: {
    cat:
      "Meow. Billi ne decide kiya hai ki abhi nap time hai. Tum bhi thoda aaram kar lo.",
    plant:
      "Naya patta aa gaya. Dekho, consistency kaam karti hai. Tumhare plants bhi khush, hopefully.",
    moon:
      "Bas aaj ke liye itna hi. Baaki baatein agli coffee pe.",
  },
};
