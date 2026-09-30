"use client";

import Image from "next/image";
import {
  startTransition,
  useEffect,
  useRef,
  useState,
} from "react";

const silaNames = ["PERTAMA", "KEDUA", "KETIGA", "KEEMPAT", "KELIMA"];

const silaContent = [
  {
    name: "Ketuhanan Yang Maha Esa",
    shortName: "Ketuhanan",
    description:
      "Perubahan zaman tetap perlu memberi ruang bagi kehidupan beragama dan keyakinan yang dianut masyarakat.",
    question: "Apakah pilihan ini menghormati keyakinan diri sendiri dan orang lain?",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/69/Pancasila_Sila_1_Star.svg",
    alt: "Bintang emas, simbol sila pertama Pancasila.",
    source: "https://commons.wikimedia.org/wiki/File:Pancasila_Sila_1_Star.svg",
  },
  {
    name: "Kemanusiaan yang adil dan beradab",
    shortName: "Kemanusiaan",
    description:
      "Kebebasan perlu berjalan bersama penghormatan terhadap martabat manusia dan tanggung jawab kepada sesama.",
    question: "Apakah keputusan ini menjaga martabat dan batas personal semua pihak?",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/9d/Pancasila_Sila_2_Chain.svg",
    alt: "Rantai, simbol sila kedua Pancasila.",
    source: "https://commons.wikimedia.org/wiki/File:Pancasila_Sila_2_Chain.svg",
  },
  {
    name: "Persatuan Indonesia",
    shortName: "Persatuan",
    description:
      "Keterbukaan terhadap budaya global dapat berjalan bersama kesadaran terhadap identitas dan nilai bersama.",
    question:
      "Bagaimana pilihan ini memengaruhi rasa saling menghargai di tengah perbedaan?",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/a8/Pancasila_Sila_3_Banyan_Tree.svg",
    alt: "Pohon beringin, simbol sila ketiga Pancasila.",
    source:
      "https://commons.wikimedia.org/wiki/File:Pancasila_Sila_3_Banyan_Tree.svg",
  },
  {
    name: "Kerakyatan yang dipimpin oleh hikmat kebijaksanaan dalam permusyawaratan/perwakilan",
    shortName: "Kerakyatan",
    description:
      "Perubahan sosial perlu dihadapi melalui pertimbangan, dialog, dan sikap demokratis.",
    question: "Sudahkah berbagai pandangan dan pihak yang terdampak didengar?",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/f1/Pancasila_Sila_4_Buffalo%27s_Head.svg",
    alt: "Kepala banteng, simbol sila keempat Pancasila.",
    source:
      "https://commons.wikimedia.org/wiki/File:Pancasila_Sila_4_Buffalo%27s_Head.svg",
  },
  {
    name: "Keadilan sosial bagi seluruh rakyat Indonesia",
    shortName: "Keadilan sosial",
    description:
      "Perkembangan sebaiknya memberi manfaat secara adil dan mempertimbangkan dampaknya bagi masyarakat.",
    question:
      "Siapa yang memperoleh manfaat, dan siapa yang mungkin menanggung dampaknya?",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/b/b9/Pancasila_Sila_5_Rice_and_Cotton.svg",
    alt: "Padi dan kapas, simbol sila kelima Pancasila.",
    source:
      "https://commons.wikimedia.org/wiki/File:Pancasila_Sila_5_Rice_and_Cotton.svg",
  },
];

const scenarios = {
  trend: {
    title: "Tren yang sedang viral",
    copy: "Popularitas sebuah tren belum cukup untuk menentukan apakah kita perlu mengikutinya. Cari konteks dan periksa dampaknya terlebih dahulu.",
    consider:
      "Siapa yang terdampak? Apakah pilihan ini menghormati orang lain dan nilai yang kamu pegang?",
  },
  technology: {
    title: "Teknologi baru",
    copy: "Teknologi dapat membuka cara baru untuk belajar, berkomunikasi, dan bekerja. Manfaatnya perlu ditimbang bersama risiko dan cara penggunaannya.",
    consider:
      "Apakah teknologi ini membantu kebutuhan nyata? Bagaimana privasi dan dampaknya bagi orang lain?",
  },
  lifestyle: {
    title: "Gaya hidup baru",
    copy: "Gaya hidup berkembang dalam konteks yang beragam. Hindari menyimpulkan dari asalnya saja, pahami alasan dan keadaan orang yang menjalaninya.",
    consider:
      "Nilai apa yang terlibat? Apakah pilihan tersebut dibuat dengan sadar dan bertanggung jawab?",
  },
};

const questions = [
  {
    question: "Apa yang dimaksud dengan ideologi terbuka?",
    options: [
      "Ideologi yang dapat diganti kapan saja",
      "Ideologi yang mampu menghadapi perkembangan tanpa kehilangan nilai dasarnya",
      "Ideologi yang menerima semua budaya asing",
      "Ideologi yang menolak perubahan",
    ],
    answer: 1,
  },
  {
    question: "Bagaimana menyikapi budaya asing dalam kerangka Pancasila?",
    options: [
      "Menerima semuanya",
      "Menolak semuanya",
      "Mempelajari dan menyaring berdasarkan nilai yang sesuai",
      "Mengikuti yang paling populer",
    ],
    answer: 2,
  },
  {
    question:
      "Manakah pernyataan yang tepat tentang globalisasi dan living together?",
    options: [
      "Living together pasti akibat langsung globalisasi",
      "Globalisasi adalah satu-satunya penyebabnya",
      "Globalisasi dapat menjadi konteks perubahan sosial, bukan penyebab tunggal",
      "Globalisasi tidak berkaitan dengan perubahan cara pandang",
    ],
    answer: 2,
  },
  {
    question: "Sebuah gaya hidup dari luar negeri sedang viral. Apa langkah yang bijak?",
    options: [
      "Langsung mengikuti agar tidak tertinggal",
      "Langsung menolak karena berasal dari luar negeri",
      "Mempelajari konteks dan mempertimbangkan dampaknya",
      "Mengikuti karena dianggap modern",
    ],
    answer: 2,
  },
  {
    question:
      "Sikap yang sejalan dengan Pancasila sebagai ideologi terbuka adalah...",
    options: [
      "Terbuka tanpa batas",
      "Menutup diri dari perubahan",
      "Terbuka, kritis, selektif, dan bertanggung jawab",
      "Mengikuti semua tren",
    ],
    answer: 2,
  },
];

type ScenarioKey = keyof typeof scenarios;
type QuizStatus = "loading" | "ready" | "empty" | "error";

function getQuizStatus(): QuizStatus {
  if (questions.length === 0) return "empty";
  const invalidQuestion = questions.some(
    (item) =>
      !item.question ||
      item.options.length === 0 ||
      item.answer < 0 ||
      item.answer >= item.options.length,
  );
  return invalidQuestion ? "error" : "ready";
}

export default function HomePage() {
  const [activeSila, setActiveSila] = useState(0);
  const [activeScenario, setActiveScenario] = useState<ScenarioKey>("trend");
  const [activeSection, setActiveSection] = useState("");
  const [loadedImage, setLoadedImage] = useState("");
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const [quizStatus, setQuizStatus] = useState<QuizStatus>("loading");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);
  const questionHeadingRef = useRef<HTMLHeadingElement>(null);
  const resultHeadingRef = useRef<HTMLHeadingElement>(null);
  const shouldFocusQuestion = useRef(false);

  const selectedSila = silaContent[activeSila];
  const selectedScenario = scenarios[activeScenario];
  const imageFailed = failedImages.includes(selectedSila.image);
  const isImageLoaded = loadedImage === selectedSila.image;

  useEffect(() => {
    startTransition(() => setQuizStatus(getQuizStatus()));
  }, []);

  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>(".reveal")];
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      sections.forEach((section) => section.classList.add("is-visible"));
      return;
    }

    document.documentElement.classList.add("motion-ready");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -50px 0px" },
    );
    sections.forEach((section) => revealObserver.observe(section));

    const navLinks = [
      ...document.querySelectorAll<HTMLAnchorElement>(".nav-links a"),
    ];
    const navTargets = navLinks
      .map((link) => document.querySelector<HTMLElement>(link.hash))
      .filter((section): section is HTMLElement => section !== null);
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    navTargets.forEach((section) => navObserver.observe(section));

    const progressBar = document.getElementById("reading-progress");
    const updateProgress = () => {
      if (!progressBar) return;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      progressBar.style.width = `${Math.min(100, progress)}%`;
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();

    return () => {
      revealObserver.disconnect();
      navObserver.disconnect();
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  useEffect(() => {
    if (shouldFocusQuestion.current) {
      questionHeadingRef.current?.focus();
      shouldFocusQuestion.current = false;
    }
    if (finished) resultHeadingRef.current?.focus();
  }, [currentQuestion, finished]);

  function chooseSila(index: number, moveFocus = false) {
    setActiveSila(index);
    if (moveFocus) {
      document.getElementById(`sila-tab-${index}`)?.focus();
    }
  }

  function handleSilaKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let nextIndex = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (index + 1) % silaContent.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + silaContent.length) % silaContent.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = silaContent.length - 1;
    } else {
      return;
    }
    event.preventDefault();
    chooseSila(nextIndex, true);
  }

  function handleAnswer(index: number) {
    if (selectedAnswer !== null || quizStatus !== "ready") return;
    setSelectedAnswer(index);
    if (index === questions[currentQuestion].answer) {
      setScore((currentScore) => currentScore + 1);
    }
  }

  function nextQuestion() {
    if (currentQuestion === questions.length - 1) {
      setFinished(true);
      return;
    }
    shouldFocusQuestion.current = true;
    setCurrentQuestion((questionIndex) => questionIndex + 1);
    setSelectedAnswer(null);
  }

  function restartQuiz() {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    shouldFocusQuestion.current = true;
    setFinished(false);
  }

  function recordImageFailure(source: string) {
    setFailedImages((images) =>
      images.includes(source) ? images : [...images, source],
    );
  }

  return (
    <>
      <header className="site-header">
        <nav className="wrap nav-row" aria-label="Navigasi utama">
          <a className="brand" href="#atas" aria-label="Pancasila, kembali ke awal">
            <span className="brand-name">
              Pancasila<span className="brand-plus">+</span>
              <small>RUANG BELAJAR</small>
            </span>
          </a>
          <ul className="nav-links">
            <li>
              <a
                href="#dasar"
                aria-current={activeSection === "dasar" ? "location" : undefined}
              >
                Ideologi
              </a>
            </li>
            <li>
              <a
                href="#sila"
                aria-current={activeSection === "sila" ? "location" : undefined}
              >
                Lima sila
              </a>
            </li>
            <li>
              <a
                href="#perubahan"
                aria-current={
                  activeSection === "perubahan" ? "location" : undefined
                }
              >
                Perubahan zaman
              </a>
            </li>
            <li>
              <a
                href="#fenomena"
                aria-current={
                  activeSection === "fenomena" ? "location" : undefined
                }
              >
                Living together
              </a>
            </li>
            <li>
              <a
                href="#kuis"
                aria-current={activeSection === "kuis" ? "location" : undefined}
              >
                Kuis
              </a>
            </li>
          </ul>
          <details className="mobile-menu" ref={mobileMenuRef}>
            <summary>
              <span className="menu-glyph" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              Menu
            </summary>
            <ul className="mobile-links">
              {[
                ["#dasar", "Ideologi terbuka"],
                ["#sila", "Lima sila"],
                ["#perubahan", "Perubahan zaman"],
                ["#filter", "Pancasila sebagai filter"],
                ["#fenomena", "Living together"],
                ["#kuis", "Kuis pemahaman"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={() => {
                      if (mobileMenuRef.current) {
                        mobileMenuRef.current.open = false;
                      }
                    }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="atas" aria-labelledby="hero-title">
          <div className="wrap hero-grid">
            <div>
              <p className="hero-kicker">PENDIDIKAN PANCASILA · MEDIA BELAJAR</p>
              <h1 id="hero-title">
                Nilai yang tetap, cara hidup yang <em>berubah.</em>
              </h1>
              <p className="hero-copy">
                Pancasila sebagai ideologi terbuka membantu kita membaca perubahan
                zaman dengan pikiran jernih, sikap kritis, dan tanggung jawab.
              </p>
              <div className="hero-actions">
                <a className="button" href="#dasar">
                  Mulai dari dasar
                </a>
                <a className="button button--quiet" href="#kuis">
                  Uji pemahaman
                </a>
              </div>
              <div className="hero-note">
                <strong aria-hidden="true">01</strong>
                <span>
                  Pelajari bagaimana keterbukaan dapat berjalan bersama nilai
                  dasar bangsa.
                </span>
              </div>
            </div>
            <aside className="values-board" aria-label="Lima sila Pancasila">
              <div className="board-emblem">
                <div>
                  <span>LAMBANG NEGARA</span>
                  <strong>Garuda Pancasila</strong>
                  <a
                    href="https://commons.wikimedia.org/wiki/File:National_emblem_of_Indonesia_Garuda_Pancasila.svg"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Sumber: Wikimedia Commons
                  </a>
                </div>
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/9/90/National_emblem_of_Indonesia_Garuda_Pancasila.svg"
                  alt="Lambang negara Garuda Pancasila dengan perisai lima sila."
                  width={98}
                  height={108}
                  unoptimized
                  priority
                />
              </div>
              <div className="board-heading">
                <strong>Lima nilai, satu landasan</strong>
                <span>PILIH NILAI UNTUK MEMBACA</span>
              </div>
              <ol className="value-links">
                {silaContent.map((sila, index) => (
                  <li key={sila.shortName}>
                    <a href="#sila" onClick={() => chooseSila(index)}>
                      <b>0{index + 1}</b>
                      <span>{sila.name}</span>
                      <i aria-hidden="true">{index + 1}</i>
                    </a>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </section>

        <section className="section-pad reveal" id="dasar" aria-labelledby="dasar-title">
          <div className="wrap intro-layout">
            <div className="intro-aside">
              <p className="section-kicker">MEMAHAMI DASAR</p>
              <div className="section-title">
                <h2 id="dasar-title">
                  Terbuka terhadap zaman, berpegang pada nilai.
                </h2>
                <p>
                  Ideologi terbuka memberi ruang bagi masyarakat untuk menghadapi
                  perkembangan tanpa mengganti landasan yang menjadi identitas
                  bersama.
                </p>
              </div>
              <div className="open-statement">
                <strong>Keterbukaan bukan berarti menerima semuanya.</strong>
                <p>
                  Pengaruh baru tetap perlu dipahami, ditimbang, dan disesuaikan
                  dengan nilai yang kita pegang.
                </p>
              </div>
            </div>
            <div className="principle-list">
              <article className="principle-row">
                <span>01</span>
                <div>
                  <h3>Apa itu ideologi?</h3>
                  <p>
                    Seperangkat gagasan, nilai, dan prinsip yang menjadi dasar
                    dalam mengarahkan kehidupan masyarakat atau negara.
                  </p>
                </div>
              </article>
              <article className="principle-row">
                <span>02</span>
                <div>
                  <h3>Apa yang membuatnya terbuka?</h3>
                  <p>
                    Nilai dasarnya tetap, sementara penerapan dan jawaban terhadap
                    persoalan baru dapat berkembang bersama masyarakat.
                  </p>
                </div>
              </article>
              <article className="principle-row">
                <span>03</span>
                <div>
                  <h3>Apa peran Pancasila?</h3>
                  <p>
                    Pancasila menjadi landasan untuk menilai perubahan, bukan
                    alasan untuk menutup diri maupun mengikuti semua hal tanpa
                    pertimbangan.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section
          className="section-pad sila-section reveal"
          id="sila"
          aria-labelledby="sila-title"
        >
          <div className="wrap">
            <p className="section-kicker">LIMA SILA DALAM KEHIDUPAN</p>
            <div className="section-title">
              <h2 id="sila-title">
                Nilai dasar, dekat dengan keputusan sehari-hari.
              </h2>
              <p>
                Pilih satu sila untuk melihat cara nilainya membantu kita membaca
                perubahan.
              </p>
            </div>
            <div className="sila-layout">
              <div className="sila-selector" role="tablist" aria-label="Pilih sila Pancasila">
                {silaContent.map((sila, index) => (
                  <button
                    type="button"
                    role="tab"
                    id={`sila-tab-${index}`}
                    aria-selected={activeSila === index}
                    aria-controls="sila-panel"
                    tabIndex={activeSila === index ? 0 : -1}
                    key={sila.shortName}
                    onClick={() => chooseSila(index)}
                    onKeyDown={(event) => handleSilaKeyDown(event, index)}
                  >
                    <Image
                      src={sila.image}
                      alt=""
                      width={34}
                      height={34}
                      unoptimized
                      loading="lazy"
                      onError={() => recordImageFailure(sila.image)}
                    />
                    <span>
                      <b>SILA {index + 1}</b>
                      <strong>{sila.shortName}</strong>
                    </span>
                    <i aria-hidden="true">+</i>
                  </button>
                ))}
              </div>
              <article
                className="sila-detail"
                id="sila-panel"
                role="tabpanel"
                aria-labelledby={`sila-tab-${activeSila}`}
                tabIndex={0}
              >
                <div className="sila-detail-layout">
                  <div>
                    <span className="number">SILA {silaNames[activeSila]}</span>
                    <h3>{selectedSila.name}</h3>
                    <p>{selectedSila.description}</p>
                    <div className="application">
                      <strong>Untuk direnungkan</strong>
                      <span>{selectedSila.question}</span>
                    </div>
                  </div>
                  <div className="sila-illustration">
                    {imageFailed ? (
                      <span className="image-fallback">Simbol tidak tersedia</span>
                    ) : (
                      <Image
                        key={selectedSila.image}
                        src={selectedSila.image}
                        alt={selectedSila.alt}
                        width={132}
                        height={132}
                        unoptimized
                        onLoad={() => setLoadedImage(selectedSila.image)}
                        onError={() => recordImageFailure(selectedSila.image)}
                      />
                    )}
                    <span className="sr-only" aria-live="polite">
                      {imageFailed
                        ? "Gambar simbol sila gagal dimuat."
                        : isImageLoaded
                          ? "Gambar simbol sila telah dimuat."
                          : "Memuat gambar simbol sila."}
                    </span>
                  </div>
                </div>
                <p className="sila-source">
                  Simbol: Gunkarta Gunawan Kartapranata, domain publik menurut
                  halaman berkas. {" "}
                  <a
                    href={selectedSila.source}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Lihat sumber di Wikimedia Commons
                  </a>
                  .
                </p>
              </article>
            </div>
            <p className="sila-hint">
              Gunakan tombol Tab, lalu tombol panah untuk berpindah sila.
            </p>
          </div>
        </section>

        <section
          className="section-pad exchange-section reveal"
          id="perubahan"
          aria-labelledby="perubahan-title"
        >
          <div className="wrap">
            <div className="exchange-head">
              <div>
                <p className="section-kicker">MEMBACA PENGARUH</p>
                <div className="section-title">
                  <h2 id="perubahan-title">Globalisasi bukan westernisasi.</h2>
                </div>
              </div>
              <p>
                Keduanya berkaitan, tetapi memiliki cakupan berbeda. Membedakannya
                membuat kita lebih cermat membaca perubahan sosial.
              </p>
            </div>
            <div className="compare-line">
              <article className="compare-side">
                <h3>Globalisasi</h3>
                <p>Proses keterhubungan dan pertukaran lintas wilayah yang makin luas.</p>
                <ul>
                  <li>Informasi bergerak cepat melalui internet.</li>
                  <li>Teknologi menghubungkan orang dan pekerjaan.</li>
                  <li>Budaya saling dikenal dan dipertukarkan.</li>
                </ul>
              </article>
              <div className="compare-divider" aria-label="tidak sama dengan">
                <span>≠</span>
              </div>
              <article className="compare-side">
                <h3>Westernisasi</h3>
                <p>
                  Masuk atau diadopsinya unsur gaya hidup dan budaya Barat oleh
                  masyarakat.
                </p>
                <ul>
                  <li>Salah satu bentuk pengaruh budaya.</li>
                  <li>Dapat muncul dalam arus pertukaran global.</li>
                  <li>Tetap perlu dinilai berdasarkan konteks.</li>
                </ul>
              </article>
            </div>
            <p className="comparison-note">
              Sikap yang seimbang: terbuka mempelajari hal baru, lalu
              mempertimbangkan manfaat, dampak, dan kesesuaiannya dengan nilai
              yang dianut.
            </p>
            <div className="impact-columns">
              <article>
                <h3>Peluang dari keterhubungan</h3>
                <ul>
                  <li>Akses terhadap informasi dan pengetahuan lebih luas.</li>
                  <li>Teknologi membuka cara baru untuk berkomunikasi dan bekerja.</li>
                  <li>Pertukaran budaya dapat menambah wawasan dan gagasan.</li>
                  <li>Kerja sama lintas wilayah menjadi lebih mudah.</li>
                </ul>
              </article>
              <article>
                <h3>Hal yang perlu dicermati</h3>
                <ul>
                  <li>Konsumtivisme dan tekanan untuk mengikuti tren.</li>
                  <li>Sikap individualistis yang mengurangi kepedulian.</li>
                  <li>Budaya lokal kurang mendapat perhatian.</li>
                  <li>Pengaruh baru diterima tanpa memahami konsekuensinya.</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section
          className="filter-section reveal"
          id="filter"
          aria-labelledby="filter-title"
        >
          <div className="wrap">
            <div className="filter-intro">
              <div>
                <p className="section-kicker">LATIH CARA MENILAI</p>
                <div className="section-title">
                  <h2 id="filter-title">Saring pengaruh, bukan menutup diri.</h2>
                  <p>
                    Pilih situasi. Gunakan empat pertanyaan ini sebagai awal untuk
                    menimbangnya.
                  </p>
                </div>
              </div>
              <p className="scenario-prompt">
                Situasi apa yang ingin kamu pertimbangkan?
              </p>
            </div>
            <div className="scenario-list" role="group" aria-label="Pilih situasi untuk dipertimbangkan">
              {(Object.keys(scenarios) as ScenarioKey[]).map((key) => (
                <button
                  type="button"
                  aria-pressed={activeScenario === key}
                  key={key}
                  onClick={() => setActiveScenario(key)}
                >
                  {scenarios[key].title}
                </button>
              ))}
            </div>
            <div className="scenario-result" aria-live="polite" aria-atomic="true">
              <div>
                <h3>{selectedScenario.title}</h3>
                <p>{selectedScenario.copy}</p>
              </div>
              <div>
                <strong>Pertimbangkan</strong>
                <p className="consider">{selectedScenario.consider}</p>
              </div>
            </div>
            <ol className="filter-steps">
              <li>
                <strong>Terbuka</strong>
                <p>Kenali perubahan yang muncul sebelum memberi penilaian.</p>
              </li>
              <li>
                <strong>Kritis</strong>
                <p>Pahami alasan, konteks, manfaat, dan risikonya.</p>
              </li>
              <li>
                <strong>Selektif</strong>
                <p>Pilih hal yang sesuai dengan nilai dan keadaan.</p>
              </li>
              <li>
                <strong>Bertanggung jawab</strong>
                <p>Pikirkan konsekuensi bagi diri sendiri dan orang lain.</p>
              </li>
            </ol>
          </div>
        </section>

        <section
          className="section-pad reveal"
          id="fenomena"
          aria-labelledby="fenomena-title"
        >
          <div className="wrap">
            <div className="living-layout">
              <div>
                <p className="section-kicker">MENGKAJI FENOMENA SOSIAL</p>
                <div className="section-title">
                  <h2 id="fenomena-title">
                    Living together, satu fenomena dengan banyak konteks.
                  </h2>
                  <p>
                    Memahami isu sosial perlu dilakukan tanpa menyederhanakan
                    pengalaman orang menjadi satu penyebab.
                  </p>
                </div>
                <p className="living-definition">
                  Living together atau kohabitasi adalah keadaan ketika pasangan
                  yang belum menikah tinggal bersama dalam satu tempat tinggal.
                </p>
                <aside className="caution">
                  <strong>Jangan menyimpulkan terlalu cepat.</strong>
                  Globalisasi dapat menjadi konteks perubahan sosial, tetapi
                  bukan penjelasan tunggal atau penyebab langsung bagi setiap
                  keputusan individu.
                </aside>
              </div>
              <div>
                <ul
                  className="factor-list"
                  aria-label="Faktor yang dapat melatarbelakangi living together"
                >
                  <li>
                    <strong>Emosional</strong>
                    <span>Kedekatan, kenyamanan, dan kebutuhan akan dukungan.</span>
                  </li>
                  <li>
                    <strong>Ekonomi</strong>
                    <span>Pertimbangan biaya tempat tinggal dan kebutuhan sehari-hari.</span>
                  </li>
                  <li>
                    <strong>Lingkungan sosial</strong>
                    <span>Pengaruh pergaulan dan norma di sekitar seseorang.</span>
                  </li>
                  <li>
                    <strong>Media dan budaya</strong>
                    <span>Film, media sosial, dan tren dapat memengaruhi cara pandang.</span>
                  </li>
                </ul>
                <div className="impact-note">
                  <h3>Pengalaman setiap orang berbeda</h3>
                  <p>
                    Materi awal mencatat potensi kedekatan dan dukungan, sekaligus
                    risiko konflik, tekanan sosial, persoalan privasi, serta
                    perbedaan nilai. Dampaknya bergantung pada keadaan dan
                    pengalaman masing-masing.
                  </p>
                </div>
              </div>
            </div>
            <div className="interview">
              <div className="interview-heading">
                <h3>Suara dari wawancara</h3>
                <p>Pilih pertanyaan untuk membaca jawaban.</p>
              </div>
              <details>
                <summary>Bagaimana narasumber memahami living together?</summary>
                <p>
                  Narasumber memahami living together sebagai kegiatan tinggal
                  bersama pasangan tanpa ikatan perkawinan yang diakui secara
                  hukum dan agama.
                </p>
              </details>
              <details>
                <summary>Faktor apa yang disebut dalam wawancara?</summary>
                <p>
                  Narasumber menyebut kedekatan, kenyamanan, faktor ekonomi,
                  kebutuhan emosional, rasa penasaran, dan faktor keluarga
                  sebagai kemungkinan alasan.
                </p>
              </details>
              <details>
                <summary>Bagaimana pengaruh media dan budaya asing?</summary>
                <p>
                  Menurut narasumber, media sosial, film, dan budaya asing dapat
                  memengaruhi cara berpikir anak muda, termasuk melalui rasa takut
                  tertinggal tren.
                </p>
              </details>
              <details>
                <summary>Apa arti ideologi terbuka menurut narasumber?</summary>
                <p>
                  Pancasila memberi ruang untuk menghadapi perubahan zaman,
                  tetapi tidak berarti menerima semua pengaruh tanpa penyaringan.
                </p>
              </details>
              <details>
                <summary>Apa yang perlu dilakukan generasi muda?</summary>
                <p>
                  Narasumber berpendapat bahwa generasi muda perlu bersikap kritis
                  dan membedakan pengaruh yang sesuai maupun tidak sesuai dengan
                  nilai Pancasila.
                </p>
              </details>
              <p className="interview-caveat">
                Jawaban ini berasal dari satu subjek wawancara dan tidak mewakili
                seluruh pelajar atau generasi muda Indonesia.
              </p>
            </div>
          </div>
        </section>

        <section
          className="section-pad quiz-section reveal"
          id="kuis"
          aria-labelledby="kuis-title"
        >
          <div className="wrap quiz-layout">
            <div>
              <p className="section-kicker">CEK PEMAHAMAN</p>
              <div className="section-title">
                <h2 id="kuis-title">Sudah siap menyaring pengaruh?</h2>
                <p>
                  Jawab lima pertanyaan tentang ideologi terbuka, globalisasi,
                  dan cara membaca perubahan sosial.
                </p>
              </div>
            </div>
            <div className="quiz-shell" id="quiz-shell">
              {quizStatus === "loading" ? (
                <p role="status" aria-live="polite">Menyiapkan pertanyaan...</p>
              ) : quizStatus === "empty" ? (
                <p role="status">Belum ada pertanyaan untuk ditampilkan.</p>
              ) : quizStatus === "error" ? (
                <div role="alert">
                  <h3>Kuis tidak dapat ditampilkan.</h3>
                  <p>Periksa materi kuis lalu muat ulang halaman.</p>
                </div>
              ) : finished ? (
                <div className="quiz-result">
                  <p className="section-kicker">SELESAI</p>
                  <h3 ref={resultHeadingRef} tabIndex={-1}>
                    Terima kasih sudah berpikir kritis.
                  </h3>
                  <span className="quiz-score">{score}/{questions.length}</span>
                  <p>
                    {score === questions.length
                      ? "Kamu memahami gagasan utama materi ini."
                      : score >= 3
                        ? "Pemahamanmu sudah terbentuk. Cermati kembali bagian yang ingin kamu perdalam."
                        : "Kembali ke materi untuk meninjau lagi cara menyaring pengaruh."}
                  </p>
                  <button className="button" type="button" onClick={restartQuiz}>
                    Ulangi kuis
                  </button>
                </div>
              ) : (
                <div className="quiz-area">
                  <div className="quiz-topline">
                    <span>
                      Pertanyaan {currentQuestion + 1} dari {questions.length}
                    </span>
                    <span>Skor: {score}</span>
                  </div>
                  <div className="quiz-progress" aria-hidden="true">
                    <span
                      style={{
                        width: `${(currentQuestion / questions.length) * 100}%`,
                      }}
                    />
                  </div>
                  <h3
                    className="quiz-question"
                    ref={questionHeadingRef}
                    tabIndex={-1}
                  >
                    {questions[currentQuestion].question}
                  </h3>
                  <div className="quiz-options">
                    {questions[currentQuestion].options.map((option, index) => {
                      const correct = questions[currentQuestion].answer === index;
                      const chosen = selectedAnswer === index;
                      return (
                        <button
                          className={`quiz-option${selectedAnswer !== null && correct ? " is-correct" : ""}${chosen && !correct ? " is-wrong" : ""}`}
                          type="button"
                          key={option}
                          disabled={selectedAnswer !== null}
                          onClick={() => handleAnswer(index)}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                  <p
                    className="quiz-feedback"
                    data-state={
                      selectedAnswer === null
                        ? ""
                        : selectedAnswer === questions[currentQuestion].answer
                          ? "correct"
                          : "wrong"
                    }
                    role="status"
                    aria-live="polite"
                  >
                    {selectedAnswer === null
                      ? ""
                      : selectedAnswer === questions[currentQuestion].answer
                        ? "Tepat. Sikap kritis dan selektif merupakan bagian dari ideologi terbuka."
                        : "Belum tepat. Ingat, terbuka bukan berarti menerima semuanya tanpa pertimbangan."}
                  </p>
                  <div className="quiz-actions">
                    <span aria-live="polite">
                      {selectedAnswer === null
                        ? "Pilih satu jawaban."
                        : "Jawaban sudah dicatat."}
                    </span>
                    {selectedAnswer !== null && (
                      <button
                        className="button"
                        type="button"
                        onClick={nextQuestion}
                      >
                        {currentQuestion === questions.length - 1
                          ? "Lihat hasil"
                          : "Pertanyaan berikutnya"}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="closing reveal" aria-label="Penutup">
          <div className="wrap closing-row">
            <p>
              Nilai menjadi pegangan. Sikap kritis membantu kita menentukan
              langkah.
            </p>
            <a className="button" href="#atas">Kembali ke awal</a>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap footer-row">
          <div>
            <a className="brand" href="#atas">
              <span className="brand-name">
                Pancasila<span className="brand-plus">+</span>
                <small>RUANG BELAJAR</small>
              </span>
            </a>
            <p>
              Media belajar tentang Pancasila sebagai ideologi terbuka,
              globalisasi, westernisasi, dan perubahan sosial. Materi wawancara
              dan catatan penelitian mengikuti naskah awal, dengan batasan
              sumber dijelaskan pada bagian terkait.
            </p>
          </div>
          <a className="footer-top" href="#atas">Kembali ke atas</a>
        </div>
      </footer>
    </>
  );
}