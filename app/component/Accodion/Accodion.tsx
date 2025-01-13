import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faReply } from '@fortawesome/free-solid-svg-icons';
import { AccordionContainer, AccordionItem, AccordionHeader, AccordionContent } from './Accodion.styled';

interface FAQItem {
    question: string;
    answer: string;
}

interface AccordionProps {
    items: FAQItem[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <AccordionContainer>
        {items.map((item, index) => (
            <AccordionItem key={index}>
            <AccordionHeader onClick={() => toggleAccordion(index)}>
                <span>{item.question}</span>
                {activeIndex === index ? (
                <FontAwesomeIcon icon={faMinus} style={{fontSize: '1.5rem' }} />
                ) : (
                <FontAwesomeIcon icon={faPlus} style={{fontSize: '1.5rem' }} />
                )}
            </AccordionHeader>
            {activeIndex === index &&
            (<AccordionContent>
                <FontAwesomeIcon
                    icon={faReply}
                    style={{
                    transform: 'rotate(180deg)',
                    fontSize: '1.4rem',
                    marginRight: '10px',
                    }}
                />
                <div>{item.answer}</div>
                </AccordionContent>
            )}
            </AccordionItem>
        ))}
        </AccordionContainer>
    );
};

export default Accordion;
