/**
 * OWASP AppSec Days Portugal 2026 - Training Ticket Modal
 * Walks visitors through the exact Eventbrite steps for a given training
 * before sending them off to buy the ticket.
 */

(function () {
    'use strict';

    const EVENTBRITE_URL = 'https://www.eventbrite.com/e/owasp-appsec-days-portugal-2026-tickets-1985865367773';

    const ICONS = {
        ticket: '<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>',
        plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
        person: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'
    };

    const INTRO = {
        en: 'To join this training, you need to get the correct tickets on Eventbrite.',
        pt: 'Para participar nesta formação, tem de obter os bilhetes corretos no Eventbrite.'
    };
    const CTA_LABEL = {
        en: 'OK, take me to Eventbrite',
        pt: 'OK, levar-me para o Eventbrite'
    };
    const CAPTION = {
        en: 'You will be redirected to Eventbrite to complete your order.',
        pt: 'Será redirecionado para o Eventbrite para concluir a sua compra.'
    };
    const PT_RESIDENT_STEP = {
        icon: 'person',
        heading: { en: "If you're resident in Portugal", pt: 'Se for residente em Portugal' },
        desc: { en: 'Choose the "PT Resident" tickets.', pt: 'Escolha os bilhetes "PT Resident".' }
    };

    function ticketSteps(ticketName) {
        return [
            {
                icon: 'ticket',
                heading: { en: `Buy the "${ticketName}" ticket`, pt: `Compre o bilhete "${ticketName}"` },
                desc: { en: `On Eventbrite, select the "${ticketName}" ticket.`, pt: `No Eventbrite, selecione o bilhete "${ticketName}".` }
            },
            PT_RESIDENT_STEP
        ];
    }

    const TRAININGS = {
        'llm-security': {
            title: { en: 'Secure Coding for Large Language Model Applications', pt: 'Código Seguro para Aplicações de Modelos de Linguagem' },
            badges: [
                { cls: 'defender', en: 'Defender', pt: 'Defender' },
                { cls: 'intermediate', en: 'Intermediate', pt: 'Intermédio' }
            ],
            avatar: { src: 'https://sessionize.com/image/f157-400o400o1-a4qzDHaaMUBwQ8d87cKegi.png', alt: 'Fabio Cerullo' },
            steps: ticketSteps('Training:Secure Coding for LLM Applications')
        },
        'threat-modeling': {
            title: { en: 'Becoming the Godfather of Threat Modeling', pt: 'Tornar-se o Padrinho da Modelação de Ameaças' },
            badges: [
                { cls: 'defender', en: 'Defender', pt: 'Defender' },
                { cls: 'beginner', en: 'Beginner', pt: 'Iniciante' }
            ],
            avatar: { src: 'https://sessionize.com/image/cbb9-0o0o0-KpPDodGy1RB8z1r4yzWUS8.jpg', alt: 'Mike van der Bijl' },
            steps: ticketSteps('Training:Becoming the Godfather of threat modeling')
        },
        'hacking-ble': {
            title: { en: 'Hacking BLE 101', pt: 'Hacking BLE 101' },
            badges: [
                { cls: 'breaker', en: 'Breaker', pt: 'Breaker' },
                { cls: 'beginner', en: 'Beginner', pt: 'Iniciante' }
            ],
            avatar: { src: 'https://sessionize.com/image/cd2b-0o0o0-DaKen8JxKUU8n9LVtk5VAZ.jpg', alt: 'David Sopas' },
            steps: ticketSteps('Training:Hacking BLE 101')
        },
        'security-champions': {
            title: { en: 'How to Build a Successful Security Champions Program', pt: 'Como Construir um Programa de Campeões de Segurança' },
            badges: [
                { cls: 'builder', en: 'Builder', pt: 'Builder' },
                { cls: 'intermediate', en: 'Intermediate', pt: 'Intermédio' }
            ],
            avatar: { src: 'https://sessionize.com/image/a1e9-0o0o0-hHG5AcfEQvLkFehwi53r7b.jpg', alt: 'Juliane Reimann' },
            steps: ticketSteps('Training:Build a Security Champions program')
        },
        'mobile-app-attacks': {
            title: { en: 'Practical Mobile App Attacks By Example', pt: 'Ataques Práticos a Aplicações Móveis Com Exemplos' },
            badges: [
                { cls: 'builder', en: 'Builder', pt: 'Builder' },
                { cls: 'intermediate', en: 'Intermediate', pt: 'Intermédio' }
            ],
            avatar: { src: 'https://sessionize.com/image/1710-0o0o0-huHhCxyJ5h2CbGtue7Kuib.png', alt: 'Abraham Aranguren' },
            steps: ticketSteps('Training:Practical Mobile Attacks by Example')
        },
        'juice-shop': {
            title: { en: 'Hands-on Workshop: OWASP Juice Shop for Beginners', pt: 'Workshop Prático: OWASP Juice Shop para Principiantes' },
            badges: [
                { cls: 'breaker', en: 'Breaker', pt: 'Breaker' },
                { cls: 'beginner', en: 'Beginner', pt: 'Iniciante' },
                { cls: 'free', en: 'Free', pt: 'Gratuito' }
            ],
            avatar: { src: 'https://sessionize.com/image/8d95-0o0o0-BjR3YR5j9XPfV2jBVbfaT4.jpg', alt: 'Björn Kimminich' },
            steps: [
                {
                    icon: 'ticket',
                    heading: { en: 'Buy your conference ticket', pt: 'Compre o seu bilhete da conferência' },
                    desc: { en: 'This training is free, but requires a valid conference ticket.', pt: 'Esta formação é gratuita, mas requer um bilhete de conferência válido.' }
                },
                {
                    icon: 'plus',
                    heading: { en: 'Add the "Training:OWASP Juice Shop for Beginners" free ticket', pt: 'Adicione o bilhete gratuito "Training:OWASP Juice Shop for Beginners"' },
                    desc: { en: "On Eventbrite, add the \"Training:OWASP Juice Shop for Beginners\" free ticket to your order. You'll need the order ID from your conference ticket purchase.", pt: 'No Eventbrite, adicione o bilhete gratuito "Training:OWASP Juice Shop for Beginners" à sua encomenda. Vai precisar do ID da encomenda do seu bilhete da conferência.' }
                },
                {
                    icon: 'person',
                    heading: { en: "If you're resident in Portugal", pt: 'Se for residente em Portugal' },
                    desc: { en: 'Choose the "PT Resident" tickets and provide your VAT number.', pt: 'Escolha os bilhetes "PT Resident" e forneça o seu número de contribuinte.' }
                }
            ]
        }
    };

    function getLang() {
        return localStorage.getItem('appsecdays-lang') === 'pt' ? 'pt' : 'en';
    }

    function buildModal() {
        const overlay = document.createElement('div');
        overlay.id = 'ticket-modal-overlay';
        overlay.className = 'ticket-modal-overlay';
        overlay.hidden = true;

        overlay.innerHTML = `
            <div class="ticket-modal" role="dialog" aria-modal="true" aria-labelledby="ticket-modal-title" tabindex="-1">
                <button type="button" class="ticket-modal-close" id="ticket-modal-close" aria-label="Close">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
                <div class="ticket-modal-header">
                    <div class="ticket-modal-badges" id="ticket-modal-badges"></div>
                    <div class="ticket-modal-avatar" id="ticket-modal-avatar"></div>
                </div>
                <h3 class="ticket-modal-title" id="ticket-modal-title"></h3>
                <hr class="ticket-modal-divider">
                <p class="ticket-modal-intro" id="ticket-modal-intro"></p>
                <div class="ticket-modal-steps" id="ticket-modal-steps"></div>
                <button type="button" class="ticket-modal-cta" id="ticket-modal-cta">
                    <span id="ticket-modal-cta-label"></span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </button>
                <p class="ticket-modal-caption" id="ticket-modal-caption"></p>
            </div>
        `;
        document.body.appendChild(overlay);
        return overlay;
    }

    function populate(overlay, training) {
        const lang = getLang();

        overlay.querySelector('#ticket-modal-badges').innerHTML =
            training.badges.map(b => `<span class="t-badge ${b.cls}">${b[lang]}</span>`).join('');

        overlay.querySelector('#ticket-modal-avatar').innerHTML =
            `<img src="${training.avatar.src}" alt="${training.avatar.alt}">`;

        overlay.querySelector('#ticket-modal-title').textContent = training.title[lang];
        overlay.querySelector('#ticket-modal-intro').textContent = INTRO[lang];

        overlay.querySelector('#ticket-modal-steps').innerHTML = training.steps.map((step, i) => `
            <div class="ticket-step">
                <div class="ticket-step-icon">
                    <span class="ticket-step-num">${i + 1}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${ICONS[step.icon]}</svg>
                </div>
                <div class="ticket-step-content">
                    <h4>${step.heading[lang]}</h4>
                    <p>${step.desc[lang]}</p>
                </div>
            </div>
        `).join('');

        overlay.querySelector('#ticket-modal-cta-label').textContent = CTA_LABEL[lang];
        overlay.querySelector('#ticket-modal-caption').textContent = CAPTION[lang];
    }

    function openModal(overlay, training) {
        overlay._currentTraining = training;
        populate(overlay, training);
        overlay.hidden = false;
        document.body.style.overflow = 'hidden';
        overlay.querySelector('.ticket-modal').focus();

        overlay.querySelector('#ticket-modal-cta').onclick = () => {
            window.open(EVENTBRITE_URL, '_blank', 'noopener,noreferrer');
            closeModal(overlay);
        };
    }

    function closeModal(overlay) {
        overlay.hidden = true;
        overlay._currentTraining = null;
        document.body.style.overflow = '';
    }

    document.addEventListener('DOMContentLoaded', function () {
        const triggers = document.querySelectorAll('[data-ticket-modal]');
        if (!triggers.length) return;

        const overlay = buildModal();

        overlay.querySelector('#ticket-modal-close').addEventListener('click', () => closeModal(overlay));
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal(overlay);
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !overlay.hidden) closeModal(overlay);
        });

        // Keep an open modal in sync if the visitor switches language mid-flow
        document.addEventListener('click', (e) => {
            if (e.target.closest('.lang-option') && !overlay.hidden && overlay._currentTraining) {
                setTimeout(() => populate(overlay, overlay._currentTraining), 0);
            }
        });

        triggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const training = TRAININGS[trigger.dataset.ticketModal];
                if (!training) return;
                openModal(overlay, training);
            });
        });
    });
})();
