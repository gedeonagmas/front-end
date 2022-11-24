//parallax effect new
$(window).scroll(function () {
  parallaxTop();
  // parallaxBottom();
});

function parallaxBottom() {
  let wScroll = $(window).scrollTop();
  // console.log("helo");
  $(".parallax--bg--bottom").css(
    "background-position",
    "center " + wScroll * 0.75 + "px"
  );
}

function parallaxTop() {
  let wScroll = $(window).scrollTop();
  // console.log("helo");
  $(".parallax--bg--top").css(
    "background-position",
    "center " + wScroll * 0.75 + "px"
  );
}

const activepage = window.location;
const navLinks = document.querySelectorAll("nav a").forEach((link) => {
  console.log(link.href);
});
// parallax effect
gsap.registerPlugin(ScrollTrigger);

// hro animation
const heroTl = gsap.timeline({
  defaults: {
    duration: 1,
    ease: "power3.easeOut",
  },
});
heroTl.fromTo(".cta1", { x: "100% ", opacity: 0.5 }, { x: 0, opacity: 1 });

heroTl.fromTo(
  ".cta3",
  { x: "-100% ", opacity: 0.5 },
  { x: 0, opacity: 1 },
  "<25%"
);

heroTl.fromTo(
  ".cta2",
  { y: "100% ", opacity: 0.5 },
  { y: 0, opacity: 1 },
  "<25%"
);

heroTl.fromTo(
  ".cta4",
  { x: "100% ", opacity: 0.5 },
  { x: 0, opacity: 1 },
  "<25%"
);

heroTl.fromTo(
  ".cta6",
  { x: "-100% ", opacity: 0.5 },
  { x: 0, opacity: 1 },
  "<25%"
);

heroTl.fromTo(
  ".cta5",
  { y: "100% ", opacity: 0.5 },
  { y: 0, opacity: 1 },
  "<25%"
);

heroTl.fromTo(
  ".hero-text-discription",
  { y: "100% ", opacity: 0 },
  { y: 0, opacity: 1 },
  "<25%"
);

heroTl.fromTo(
  ".header-container",
  { y: "-100% ", opacity: 0 },
  { y: 0, opacity: 1 },
  "<25%"
);

// scroll animation
gsap.from(".image-container", {
  scrollTrigger: {
    trigger: ".feature-container",
  },
  stagger: {
    amount: 0.5,
  },
  scale: 0,
  opacity: 0,
  duration: 1,
});

const containers = document.querySelectorAll(".input-container");
const form = document.querySelector("form");

const tl = gsap.timeline({ defaults: { duration: 1 } });
const start =
  "M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512";
const end =
  "M1 0.999512C1 0.999512 61.5 7.5 151 7.5C240.5 7.5 301 0.999512 301 0.999512";

// Elastic effect
containers.forEach((container) => {
  const input = container.querySelector(".input");
  const line = container.querySelector(".elastic-line");
  const placeholder = container.querySelector(".place-holder");

  input.addEventListener("focus", () => {
    // check if there is any text on input
    if (!input.value) {
      tl.fromTo(
        line,
        { attr: { d: start } },
        { attr: { d: end }, ease: "power2.easeOut", duration: 0.75 }
      );
      tl.to(line, { attr: { d: start }, ease: "elastic.out(3, 0.5)" }, "<50%");

      // placeholder shift
      tl.to(
        placeholder,
        {
          top: -15,
          left: 0,
          scale: 0.7,
          duration: 0.5,
          ease: "power2.easeOut",
        },
        "<15%"
      );
    }
  });
});

// Revert back if not focused
form.addEventListener("click", () => {
  containers.forEach((container) => {
    const input = container.querySelector(".input");
    const line = container.querySelector(".elastic-line");
    const placeholder = container.querySelector(".place-holder");

    if (document.activeElement !== input) {
      if (!input.value) {
        gsap.to(placeholder, {
          top: 0,
          left: 0,
          scale: 1,
          duratoin: 0.5,
          ease: "power2.easeOut",
        });

        colorize("#D1D4DA", line, placeholder);
      }
    }

    //Name validation
    input.addEventListener("input", (e) => {
      if (e.target.type === "text") {
        let inputText = e.target.value;
        if (inputText.length > 2) {
          //Collorize
          colorize("#10B981", line, placeholder);
        } else {
          colorize("#FEBC99", line, placeholder);
        }
      }
      //Email validatin
      if (e.target.type === "email") {
        let emailValid = validateEmail(e.target.value);
        if (emailValid) {
          //Collorize
          colorize("#10B981", line, placeholder);
        } else {
          colorize("#FEBC99", line, placeholder);
        }
      }
    });
  });
});

// cheaking email validation
function validateEmail(email) {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
}
function validatePhone(phone) {
  let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return re.test(phone);
}

// colorize funtion
function colorize(color, line, placeholder) {
  gsap.to(line, { stroke: color, duration: 0.75 });
  gsap.to(placeholder, { color: color, duration: 0.75 });
}

// animating charcter
gsap.set("#eye", { tranformOrigin: "center" });
gsap.fromTo(
  "#eye",
  { scaleY: 1 },
  {
    scaleY: 0.3,
    repeat: -1,
    yoyo: true,
    repeatDelay: 0.5,
    ease: "power2.easeOut",
  }
);

gsap.fromTo(
  "#eyebrow",
  { y: 0 },
  { y: -1, repeat: -1, yoyo: true, repeatDelay: 0.5, ease: "power2.easeOut" }
);
