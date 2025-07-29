import { Component } from '@angular/core';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import {ChatMessage, ChatMessages} from '../../interfaces/chat.interfaces';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {NgClass} from '@angular/common';


const randomMessages = [
  "The history of the world is a complex tapestry woven from countless individual stories, grand events, and the slow, inexorable march of progress and decline. From the rise and fall of empires to the quiet innovations that change daily life, every era contributes its unique threads to this vast narrative. Understanding these layers helps us appreciate the present and anticipate the future, as patterns often repeat, albeit in new guises.",
  "Exploring the vastness of space continues to captivate humanity, pushing the boundaries of our knowledge and technology. From distant galaxies to the potential for life on other planets, the cosmos offers endless mysteries and opportunities for discovery. Every mission, every new astronomical finding, adds another piece to the puzzle of our universe, inspiring awe and a deeper understanding of our place within it.",
  "The development of artificial intelligence marks a significant turning point in human history, promising to reshape industries, improve daily life, and raise profound ethical questions. As AI systems become more sophisticated, their integration into society will require careful consideration of privacy, employment, and the very nature of human creativity and intelligence. The future impact of AI will largely depend on how we choose to guide its evolution.",
  "Nature's resilience is a constant source of wonder and a critical lesson for sustainable living. Despite human impact, ecosystems often find ways to recover and adapt, demonstrating an inherent ability to maintain balance. Protecting biodiversity and understanding the intricate connections within natural environments are essential steps towards ensuring the long-term health of our planet and the well-being of all its inhabitants.",
  "The art of storytelling, in its many forms, has been a fundamental part of human culture for millennia. From ancient oral traditions to modern cinematic masterpieces, stories serve to entertain, educate, and transmit values across generations. They allow us to explore different perspectives, confront complex emotions, and connect with universal human experiences, fostering empathy and understanding in a diverse world.",
  "The quiet hum of technology often masks the intricate dance of data, algorithms, and human ingenuity that powers our modern world. From the smallest smart device to the largest supercomputer, a vast network is constantly at work, processing information and connecting individuals across continents.",
  "Rainforests are vital for the planet's health, acting as enormous carbon sinks and housing an incredible array of biodiversity. Their continued destruction poses a serious threat to global climate patterns and countless species, highlighting the urgent need for conservation efforts.",
  "The invention of the printing press revolutionized the spread of knowledge, making books accessible to a wider audience and fundamentally changing education and communication. This single innovation laid the groundwork for many of the freedoms and advancements we cherish today.",
  "Urban planning is a complex discipline that seeks to balance the needs of populations with the sustainable development of cities. It involves intricate considerations of infrastructure, public spaces, housing, and environmental impact.",
  "Classical music, with its rich history and profound emotional depth, continues to resonate with audiences worldwide. Its intricate compositions and timeless melodies offer a unique journey through human expression and creativity, transcending cultural boundaries.",
  "The scientific method is the cornerstone of modern empirical inquiry, providing a systematic approach to understanding the natural world through observation, experimentation, and rigorous analysis. It is a continuous cycle of hypothesis testing and refinement.",
  "Small acts of kindness can ripple outwards, creating a significant positive impact on communities and individuals. Empathy and compassion are powerful forces that foster connection and build stronger, more supportive societies.",
  "A good book can transport you to another world.",
  "Innovation drives progress.",
  "The ocean holds many secrets.",
  "Sustainability is key.",
  "Learn something new every day.",
  "Think outside the box.",
  "Simple solutions are often best.",
  "Enjoy the little things."
];

@Component({
  standalone: true,
  selector: 'app-chat-area',
  imports: [ScrollPanelModule, ScrollingModule, NgClass],
  templateUrl: './chat-area.html',
  styleUrl: './chat-area.scss'
})

export class ChatArea {
  chatMessages: ChatMessages = [];
  constructor() {
    for (let i = 0; i < 500; i++) {
      this.chatMessages.push(this.generateMockMessage(i))
    }
  }

  generateMockMessage(id: number): ChatMessage {
    const rngType = Math.random() * 2
    return {
      id: id,
      text: randomMessages[Math.floor(Math.random() * 20)],
      timestamp: new Date().getTime(),
      type: rngType > 1 ? "incoming" : "outgoing"
    }
  }

  trackByMessageId(index: number, message: ChatMessage): number {
    return message.id; // Returns the unique 'id' from your ChatMessage object
  }
}
