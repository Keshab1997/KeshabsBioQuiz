// গেমিফিকেশন (লেভেল ব্যবস্থা)
function getLevel(score, total) {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return "বিশেষজ্ঞ";
    if (percentage >= 50) return "মধ্যম শিক্ষার্থী";
    return "নতুন শিক্ষার্থী";
}

// উৎসাহ দাও মেসেজ
const encouragementMessages = [
    "চমৎকার! তুমি একজন তারকা!",
    "বাহ! এভাবেই চালিয়ে যাও!",
    "আরেকটু চেষ্টা, জয় নিশ্চিত!",
    "মজা করো এবং শিখো, তুমি দারুণ!"
];

function showEncouragement() {
    const randomMessage = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];
    alert(randomMessage);
}

// সাউন্ড এফেক্ট (ঐচ্ছিক, ফাইল যোগ করতে হবে)
function playSound(type) {
    const audio = new Audio(type === 'correct' ? 'correct.mp3' : 'wrong.mp3');
    audio.play();
}

// কুইজ শেষে ফাংশন ইন্টিগ্রেট করা
function integrateWithQuiz(quizFunction) {
    const originalCheckAnswer = quizFunction.checkAnswer;
    quizFunction.checkAnswer = function(questionIndex, selectedIndex, element, q, selectedQuestions) {
        originalCheckAnswer(questionIndex, selectedIndex, element, q, selectedQuestions);
        if (selectedIndex === q.correct) {
            playSound('correct'); // সাউন্ড (ঐচ্ছিক)
        } else {
            playSound('wrong'); // সাউন্ড (ঐচ্ছিক)
        }
    };

    const originalDisplayQuestion = quizFunction.displayQuestion;
    quizFunction.displayQuestion = function() {
        originalDisplayQuestion();
        document.getElementById('quiz').addEventListener('click', () => {
            if (document.querySelectorAll('.correct, .wrong').length === questions.length) {
                const level = getLevel(score, questions.length);
                showEncouragement();
                alert(`তোমার লেভেল: ${level}`);
            }
        });
    };
}

// রেডি স্টেটে ইন্টিগ্রেশন
document.addEventListener('DOMContentLoaded', () => {
    if (window.questions && window.checkAnswer && window.displayQuestion) {
        integrateWithQuiz(window);
    }
});