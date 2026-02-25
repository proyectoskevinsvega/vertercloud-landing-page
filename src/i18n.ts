import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          nav: {
            services: 'Services',
            solutions: 'Solutions',
            architecture: 'Architecture',
            support: 'Support',
            docs: 'Documentation',
            login: 'Login',
            getStarted: 'Get Started',
          },
          hero: {
            tagline: '2026 Edition • Next-Gen Infrastructure',
            title: 'Cloud Infrastructure for Modern Distributed Systems',
            subtitle: 'Power microservices and distributed systems with secure, scalable, and production-ready infrastructure.',
            getStarted: 'Get Started',
            viewDocs: 'View Documentation',
          },
          platform: {
            title: 'Modular Infrastructure Platform',
            subtitle: 'Architecture based on resource isolation, network segmentation, and a shared responsibility model.',
            metrics: {
              uptime: '99.9% Uptime Goal',
              performance: 'Production-Optimized Infrastructure',
              modular: 'Scalable Modular Architecture',
            }
          },
          services: {
            title: 'Cloud Services',
            items: {
              vpn: {
                title: 'VerterVPN',
                desc: 'Private, encrypted connectivity for distributed infrastructures and corporate environments.',
                action: 'Go',
                url: 'https://verter.kevinsvega.online',
              },
              auth: {
                title: 'VerterAuth',
                desc: 'Centralized authentication with MFA and Zero Trust architecture for distributed environments.',
                action: 'Go',
                url: 'https://verterauth.kevinsvega.online',
              },
              vps: {
                title: 'VerterVPS',
                desc: 'Scalable virtual instances with total environment control and dedicated resources.',
                action: 'Go',
                url: 'https://vertervps.kevinsvega.online',
              },
              gateway: {
                title: 'API Gateway',
                desc: 'Orchestration, rate limiting, and unified entry point for microservices.',
                action: 'Go',
                url: 'https://vertergateway.kevinsvega.online',
              },
              balancer: {
                title: 'Load Balancer',
                desc: 'Intelligent traffic distribution with integrated health monitoring.',
                action: 'Go',
                url: 'https://verterlb.kevinsvega.online',
              },
            },
          },
          compliance: {
            title: 'Security & Compliance',
            desc: 'Operating under Colombian jurisdiction with clear privacy policies, transparent terms, and a shared responsibility model for production environments.',
          },
          footer: {
            desc: 'Secure, scalable cloud infrastructure designed for enterprises demanding real performance.',
            resources: 'Resources',
            legalTitle: 'Legal',
            rights: '© 2026 VerterCloud VTC. All rights reserved.',
            contactTitle: 'Contact Us',
            info: {
              commercial: 'VERTERCLOUD VTC',
              brandConnection: 'Trademark operated from BravexColombia.com',
              nit: 'NIT: 1075096139',
              city: 'Girardota, Antioquia – Colombia',
              email: 'vertercloud@gmail.com',
              emailLabel: 'Email',
              telLabel: 'Tel',
              telValue: '3007845295',
              whatsappLabel: 'WhatsApp',
              whatsappValue: '+57 3007845295',
              dianReg: 'Registered in the Single Tax Registry (RUT) with DIAN',
            },
            links: {
              docs: 'Documentation',
              api: 'API Reference',
              status: 'Status',
              privacy: 'Privacy Policy',
              terms: 'Terms of Service',
            },
            terms: {
              mainTitle: 'TÉRMINOS DE SERVICIO – VERTERCLOUD VTC',
              subtitle: 'Reliable, secure, and professional digital infrastructure.',
              lastUpdated: 'February 2026',
              operator: {
                title: 'Operator Info',
                commercial: 'VERTERCLOUD VTC',
                owner: 'VEGA MARMOLEJO KEVINS YESID',
                dian: 'Registered in the Single Tax Registry (RUT) with DIAN',
                jurisdiction: 'Base Jurisdiction: Colombia',
                address: 'Girardota, Antioquia – Colombia',
                labels: {
                  commercial: 'Commercial Name',
                  owner: 'Legal Owner',
                  identification: 'Identification',
                  jurisdiction: 'Jurisdiction',
                  address: 'Address',
                }
              },
              labels: {
                backToHome: 'Back to Home',
              },
              sections: {
                definitions: {
                  title: '1. Definitions',
                  items: [
                    '“Provider”: VERTERCLOUD VTC.',
                    '“Client”: Natural or legal person contracting services.',
                    '“Services”: Cloud infrastructure, VPS, VPN, API Gateway, Load Balancer, authentication services, and related solutions.',
                    '“Client Content”: Data, applications, or info hosted by the Client.',
                  ],
                },
                nature: {
                  title: '2. Nature of Service',
                  content: 'The services are provided under the Infrastructure-as-a-Service (IaaS) model. The Client maintains full control over their configuration and is responsible for its use. No labor or corporate relationship exists between the parties. Unless expressly agreed in writing, continuous availability or specific service levels (SLA) are not guaranteed.',
                },
                warranties: {
                  title: '3. Exclusion of Warranties',
                  content: 'The services are provided “as is” and “as available”. VERTERCLOUD VTC does not grant implied warranties of merchantability, fitness for a particular purpose, or uninterrupted availability.',
                },
                compliance: {
                  title: '4. Compliance and Sanctions',
                  content: 'The Client declares they are not in international sanction lists, will not violate technology export laws, and will comply with applicable local regulations. Provider may suspend services upon legal risk or misuse.',
                },
                security: {
                  title: '5. Shared Responsibility',
                  provider: 'Base infrastructure security and reasonable perimeter protection.',
                  client: 'Credential security, proper configuration, backups, sector regulatory compliance, and complying with applicable data protection laws in their jurisdiction when processing personal data through the Services.',
                  labels: {
                    provider: 'Provider Responsibility',
                    client: 'Client Responsibility',
                  }
                },
                usage: {
                  title: '6. Acceptable Use Policy',
                  content: ' Forbidden use: Illicit activities, DDoS attacks, malware, Phishing, spam, child exploitation, copyright violations, cryptojacking, or botnet infrastructure. Suspension can be immediate without notice.',
                },
                vpn: {
                  title: 'Usage of VPN Services',
                  content: 'The VPN service may not be used for illegal activities, evasion of international sanctions, copyright violations, or any activity contrary to the law. The Provider may cooperate with competent authorities under valid legal request.',
                },
                payment: {
                  title: '7. Payment & Billing',
                  content: 'Prepaid services. Non-refundable unless legally required. Automatic suspension for non-payment. International taxes at Client cost. In case of payment disputes, the Client agrees to first contact the Provider before initiating a chargeback. Use of the service constitutes express acceptance of the charge made. Fraudulent chargebacks may result in immediate service suspension and corresponding legal actions.',
                },
                indemnity: {
                  title: '8. Indemnity',
                  content: 'The Client agrees to indemnify and hold harmless VERTERCLOUD VTC against any claim, damage, fine, or expense derived from improper use of the service, including legal or regulatory violations attributable to the Client.',
                },
                liability: {
                  title: '9. Limitation of Liability',
                  content: 'No liability for: Indirect damages, data loss, profit loss, third-party interruptions, or external attacks. Maximum liability: amount paid in the last 30 days. In no case shall liability include special, punitive, or consequential damages.',
                },
                forceMajeure: {
                  title: '10. Force Majeure',
                  content: 'There shall be no liability for events beyond reasonable control, including natural disasters, massive network failures, acts of government, or upstream provider failures.',
                },
                termination: {
                  title: '11. Termination of Service',
                  content: 'Service may be suspended for: Breach, illicit use, non-payment, or legal order. Upon termination or final suspension, the Client will have a limited period to download their information. After such period, data may be permanently deleted without the possibility of recovery.',
                },
                jurisdiction: {
                  title: '12. Jurisdiction',
                  content: 'Any controversy will be resolved through arbitration in accordance with the rules of the corresponding Chamber of Commerce Arbitration and Conciliation Center, based in Colombia.',
                },
                modifications: {
                  title: '13. Modifications',
                  content: 'VERTERCLOUD VTC may modify these Terms at any time. Modifications will take effect from their publication on the website. Continued use of the service implies acceptance of such changes.',
                },
              }
            },
            privacy: {
              mainTitle: 'PRIVACY POLICY – VERTERCLOUD VTC',
              subtitle: 'Your data security is our top priority.',
              lastUpdated: 'February 2026',
              sections: {
                responsible: {
                  title: '1. Data Controller',
                  content: 'VERTERCLOUD VTC. Owner: VEGA MARMOLEJO KEVINS YESID. Registered in the Single Tax Registry (RUT) with DIAN. Address: Girardota, Antioquia – Colombia. Responsible Area: Data Protection Officer.',
                  role: 'Data Processing Role: When Clients use the infrastructure to process third-party personal data, they will act as Data Controllers, while VERTERCLOUD VTC will act as Data Processor in accordance with applicable legislation.',
                },
                collection: {
                  title: '2. Data We Collect',
                  content: 'We may collect: Identification data, billing information, IP address, technical logs, service usage information, and contact info. We do not access hosted content unless legal obligation or technical incident. For security and abuse prevention purposes, minimum technical records (logs) related to infrastructure usage may be retained. The Client is responsible for the content and data hosted on the infrastructure. VERTERCLOUD VTC does not actively control or monitor information stored by Clients, except for legal requirements or technical incidents.',
                },
                purpose: {
                  title: '3. Processing Purpose',
                  content: 'Service provision, billing, security, fraud prevention, and legal compliance. VERTERCLOUD VTC does not sell or trade personal data to third parties.',
                },
                base: {
                  title: '4. Legal Basis',
                  content: 'Data processing in accordance with Law 1581 of 2012, Decree 1377 of 2013, and other applicable regulations in the Republic of Colombia.',
                },
                retention: {
                  title: '5. Retention',
                  content: 'Data will be kept while a contractual relationship exists and for the additional time necessary to comply with applicable legal, tax, or regulatory obligations. In case of service termination, the provisions set forth in the Terms of Service regarding data deletion shall apply.',
                },
                transfers: {
                  title: '6. International Transfers',
                  content: 'Appropriate contractual, technical, and organizational measures will be adopted to ensure a level of protection equivalent to that required by Colombian legislation. Data may be processed in international infrastructure under these security measures.',
                },
                rights: {
                  title: '7. User Rights',
                  content: 'The user may request: Access, rectification, deletion (where applicable), and revocation of consent. Requests to: vertercloud@gmail.com. Maximum response time: 15 business days in accordance with Law 1581 of 2012. The holder may file a complaint with the Superintendency of Industry and Commerce (SIC) if they consider their rights violated. Requests must be sent from the email registered in the Client\'s account for identity verification purposes.',
                },
                minors: {
                  title: '8. Minors',
                  content: 'The services are not directed to minors.',
                },
                security: {
                  title: '9. Security',
                  content: 'Reasonable technical and organizational measures are applied to protect information.',
                },
                incidents: {
                  title: '10. Security Incident Notification',
                  content: 'In case of an incident that compromises personal data, notification will be made in accordance with applicable regulations.',
                }
              }
            },
            support: {
              mainTitle: 'Support Center',
              subtitle: 'How can we help you today?',
              categories: {
                technical: {
                  title: 'Technical Support',
                  desc: 'Infrastructure, deployment, and API issues.',
                },
                billing: {
                  title: 'Billing & Account',
                  desc: 'Payments, invoices, and subscription plans.',
                },
                security: {
                  title: 'Reports, certifications, and security breaches.',
                  desc: 'Reports, certifications, and security breaches.',
                },
              },
              faq: {
                title: 'Frequently Asked Questions',
                items: [
                  {
                    q: 'How do I deploy my first microservice?',
                    a: 'Use our CLI tool or the console to initialize your workspace and deploy in seconds.',
                  },
                  {
                    q: 'Is my data encrypted?',
                    a: 'Yes, all data at rest and in transit is encrypted using enterprise-grade standards.',
                  },
                  {
                    q: 'What are your support hours?',
                    a: 'Enterprise customers have 24/7 priority support. Standard plans have 12/5 support.',
                  },
                ]
              },
              contact: {
                title: 'Still need help?',
                desc: 'Our team is ready to assist you.',
                button: 'Contact Support',
              }
            }
          },
        },
      },
      es: {
        translation: {
          nav: {
            services: 'Servicios',
            solutions: 'Soluciones',
            architecture: 'Arquitectura',
            support: 'Soporte',
            docs: 'Documentación',
            login: 'Iniciar sesión',
            getStarted: 'Empezar',
          },
          hero: {
            tagline: 'Edición 2026 • Infraestructura de Próxima Generación',
            title: 'Infraestructura Cloud para Sistemas Distribuidos Modernos',
            subtitle: 'Potencia microservicios y sistemas distribuidos con infraestructura segura, escalable y preparada para producción.',
            getStarted: 'Empezar',
            viewDocs: 'Ver Documentación',
          },
          platform: {
            title: 'Plataforma de Infraestructura Modular',
            subtitle: 'Arquitectura basada en aislamiento de recursos, segmentación de red y modelo de responsabilidad compartida.',
            metrics: {
              uptime: '99.9% Disponibilidad Objetivo',
              performance: 'Infraestructura Optimizada para Producción',
              modular: 'Arquitectura Modular Escalable',
            }
          },
          services: {
            title: 'Servicios Cloud',
            items: {
              vpn: {
                title: 'VerterVPN',
                desc: 'Conectividad privada y cifrada para infraestructuras distribuidas y entornos corporativos.',
                action: 'Ir',
                url: 'https://verter.kevinsvega.online',
              },
              auth: {
                title: 'VerterAuth',
                desc: 'Autenticación centralizada con MFA y arquitectura Zero Trust para entornos distribuidos.',
                action: 'Ir',
                url: 'https://verterauth.kevinsvega.online',
              },
              vps: {
                title: 'VerterVPS',
                desc: 'Instancias virtuales escalables con control total del entorno y recursos dedicados.',
                action: 'Ir',
                url: 'https://vertervps.kevinsvega.online',
              },
              gateway: {
                title: 'API Gateway',
                desc: 'Orquestación, limitación de tasa y punto de entrada unificado para microservicios.',
                action: 'Ir',
                url: 'https://vertergateway.kevinsvega.online',
              },
              balancer: {
                title: 'Load Balancer',
                desc: 'Distribución inteligente de tráfico con monitoreo de salud integrado.',
                action: 'Ir',
                url: 'https://verterlb.kevinsvega.online',
              },
            },
          },
          compliance: {
            title: 'Seguridad y Cumplimiento',
            desc: 'Operando bajo jurisdicción colombiana con políticas claras de privacidad, términos transparentes y modelo de responsabilidad compartida para entornos productivos.',
          },
          footer: {
            desc: 'Infraestructura cloud segura, escalable y diseñada para empresas que exigen rendimiento real.',
            resources: 'Recursos',
            legalTitle: 'Legal',
            rights: '© 2026 VerterCloud VTC. Todos los derechos reservados.',
            contactTitle: 'Contáctanos',
            info: {
              commercial: 'VERTERCLOUD VTC',
              brandConnection: 'Marca comercial operada desde BravexColombia.com',
              nit: 'NIT: 1075096139',
              city: 'Girardota, Antioquia – Colombia',
              email: 'vertercloud@gmail.com',
              emailLabel: 'Correo Electrónico',
              telLabel: 'Tel',
              telValue: '3007845295',
              whatsappLabel: 'WhatsApp',
              whatsappValue: '+57 3007845295',
              dianReg: 'Inscrito en el Registro Único Tributario (RUT) ante la DIAN',
            },
            links: {
              docs: 'Documentación',
              api: 'Referencia API',
              status: 'Estado',
              privacy: 'Política de Privacidad',
              terms: 'Términos de Servicio',
            },
            terms: {
              mainTitle: 'TÉRMINOS DE SERVICIO – VERTERCLOUD VTC',
              subtitle: 'Infraestructura digital confiable, segura y profesional.',
              lastUpdated: 'Febrero 2026',
              operator: {
                title: 'Información del Operador',
                commercial: 'VERTERCLOUD VTC',
                owner: 'VEGA MARMOLEJO KEVINS YESID',
                dian: 'Inscrito en el Registro Único Tributario (RUT) ante la DIAN',
                jurisdiction: 'Jurisdicción base: Colombia',
                address: 'Girardota, Antioquia – Colombia',
                labels: {
                  commercial: 'Nombre Comercial',
                  owner: 'Titular Legal',
                  identification: 'Identificación',
                  jurisdiction: 'Jurisdicción',
                  address: 'Domicilio',
                }
              },
              labels: {
                backToHome: 'Volver al Inicio',
              },
              sections: {
                definitions: {
                  title: '1. Definiciones',
                  items: [
                    '“Proveedor”: VERTERCLOUD VTC.',
                    '“Cliente”: Persona natural o jurídica que contrata los servicios.',
                    '“Servicios”: Infraestructura cloud, VPS, VPN, API Gateway, Load Balancer, servicios de autenticación y soluciones relacionadas.',
                    '“Contenido del Cliente”: Datos, aplicaciones o información alojada por el Cliente.',
                  ],
                },
                nature: {
                  title: '2. Naturaleza del Servicio',
                  content: 'Los servicios se proporcionan bajo modelo Infrastructure-as-a-Service (IaaS). El Cliente mantiene control total sobre su configuración y es responsable de su uso. No existe relación laboral ni societaria entre las partes. Salvo acuerdo escrito expreso, no se garantiza disponibilidad continua ni niveles de servicio específicos (SLA).',
                },
                warranties: {
                  title: '3. Exclusión de Garantías',
                  content: 'Los servicios se proporcionan “tal cual” y “según disponibilidad”. VERTERCLOUD VTC no otorga garantías implícitas de comerciabilidad, idoneidad para un propósito particular o disponibilidad ininterrumpida.',
                },
                compliance: {
                  title: '4. Cumplimiento Normativo y Sanciones',
                  content: 'El Cliente declara que: No está en listas de sanciones internacionales, no utilizará los servicios para violar leyes de exportación y cumplirá las regulaciones locales aplicables. El Proveedor podrá suspender servicios ante riesgo legal o uso indebido.',
                },
                security: {
                  title: '5. Responsabilidad Compartida',
                  provider: 'Seguridad de infraestructura base y protección perimetral razonable.',
                  client: 'Seguridad de credenciales, configuración adecuada, backups, cumplimiento regulatorio sectorial y cumplimiento de las leyes de protección de datos aplicables en su jurisdicción cuando procese datos personales mediante los Servicios.',
                  labels: {
                    provider: 'Responsabilidad del Proveedor',
                    client: 'Responsabilidad del Cliente',
                  }
                },
                usage: {
                  title: '6. Política de Uso Aceptable',
                  content: ' Se prohíbe utilizar los servicios para: Actividades ilícitas, ataques DDoS, malware, Phishing, spam, explotación infantil, violación de derechos de autor, criptojacking, infraestructura de botnets. La suspensión puede ser inmediata sin previo aviso.',
                },
                vpn: {
                  title: 'Uso de Servicios VPN',
                  content: 'El servicio VPN no podrá utilizarse para actividades ilícitas, evasión de sanciones internacionales, violaciones de derechos de autor o cualquier actividad contraria a la ley. El Proveedor podrá cooperar con autoridades competentes bajo requerimiento legal válido.',
                },
                payment: {
                  title: '7. Pagos y Facturación',
                  content: 'Servicios prepagados. No reembolsables salvo obligación legal. Suspensión automática por impago. Impuestos internacionales a cargo del Cliente. En caso de disputas de pago, el Cliente se compromete a contactar primero al Proveedor antes de iniciar un contracargo. El uso del servicio constituye aceptación expresa del cargo realizado. Los contracargos fraudulentos podrán generar suspensión inmediata del servicio y acciones legales correspondientes.',
                },
                indemnity: {
                  title: '8. Indemnización',
                  content: 'El Cliente acepta indemnizar y mantener indemne a VERTERCLOUD VTC frente a cualquier reclamación, daño, multa o gasto derivado del uso indebido del servicio, incluyendo violaciones legales o regulatorias atribuibles al Cliente.',
                },
                liability: {
                  title: '9. Limitación de Responsabilidad',
                  content: 'No se responderá por: Daños indirectos, pérdida de datos, lucro cesante, interrupciones de terceros, ataques externos. Responsabilidad máxima: monto pagado en los últimos 30 días. En ningún caso la responsabilidad incluirá daños especiales, punitivos o consecuenciales.',
                },
                forceMajeure: {
                  title: '10. Fuerza Mayor',
                  content: 'No habrá responsabilidad por eventos fuera del control razonable, incluyendo desastres naturales, fallas masivas de red, actos gubernamentales o fallas de proveedores upstream.',
                },
                termination: {
                  title: '11. Terminación del Servicio',
                  content: 'El servicio puede suspenderse por: Incumplimiento, uso ilícito, falta de pago u orden legal. Tras la terminación o suspensión definitiva, el Cliente dispondrá de un periodo limitado para descargar su información. Transcurrido dicho plazo, los datos podrán eliminarse de forma permanente sin posibilidad de recuperación.',
                },
                jurisdiction: {
                  title: '12. Jurisdicción',
                  content: 'Cualquier controversia se resolverá mediante arbitraje conforme a las normas del Centro de Arbitraje y Conciliación de la Cámara de Comercio correspondiente, con sede en Colombia.',
                },
                modifications: {
                  title: '13. Modificaciones',
                  content: 'VERTERCLOUD VTC podrá modificar los presentes Términos en cualquier momento. Las modificaciones entrarán en vigor desde su publicación en el sitio web. El uso continuo del servicio implica aceptación de dichos cambios.',
                },
              }
            },
            privacy: {
              mainTitle: 'POLÍTICA DE PRIVACIDAD – VERTERCLOUD VTC',
              subtitle: 'La seguridad de tus datos es nuestra prioridad.',
              lastUpdated: 'Febrero 2026',
              sections: {
                responsible: {
                  title: '1. Responsable del Tratamiento',
                  content: 'VERTERCLOUD VTC. Titular: VEGA MARMOLEJO KEVINS YESID. Inscrito en el Registro Único Tributario (RUT) ante la DIAN. Domicilio: Girardota, Antioquia – Colombia. Área responsable: Oficial de Protección de Datos.',
                  role: 'Rol en el Tratamiento de Datos: Cuando los Clientes utilicen la infraestructura para procesar datos personales de terceros, actuarán como Responsables del Tratamiento, mientras que VERTERCLOUD VTC actuará como Encargado del Tratamiento en los términos de la legislación aplicable.',
                },
                collection: {
                  title: '2. Datos que Recopilamos',
                  content: 'Podemos recopilar: Datos de identificación, información de facturación, dirección IP, logs técnicos, información de uso del servicio e información de contacto. No accedemos al contenido alojado salvo obligación legal o incidente técnico. Con fines de seguridad y prevención de abuso, podrán conservarse registros técnicos mínimos (logs) relacionados con el uso de la infraestructura. El Cliente es responsable del contenido y datos alojados en la infraestructura. VERTERCLOUD VTC no controla ni supervisa de forma activa la información almacenada por los Clientes, salvo requerimiento legal o incidente técnico.',
                },
                purpose: {
                  title: '3. Finalidad del Tratamiento',
                  content: 'Prestación del servicio, facturación, seguridad, prevención de fraude y cumplimiento legal. VERTERCLOUD VTC no vende ni comercializa datos personales a terceros.',
                },
                base: {
                  title: '4. Base Legal',
                  content: 'Tratamiento conforme a la Ley 1581 de 2012, el Decreto 1377 de 2013 y demás normas aplicables en la República de Colombia.',
                },
                retention: {
                  title: '5. Conservación',
                  content: 'Los datos se conservarán mientras exista relación contractual y por el tiempo adicional necesario para cumplir obligaciones legales, fiscales o regulatorias aplicables. En caso de terminación del servicio, aplicará lo establecido en los Términos de Servicio respecto a la eliminación de datos.',
                },
                transfers: {
                  title: '6. Transferencias Internacionales',
                  content: 'Se adoptarán medidas contractuales, técnicas y organizativas adecuadas para garantizar un nivel de protección equivalente al exigido por la legislación colombiana. Los datos pueden procesarse en infraestructura internacional bajo dichas medidas de seguridad.',
                },
                rights: {
                  title: '7. Derechos del Usuario',
                  content: 'El usuario puede solicitar: Acceso, rectificación, eliminación (cuando aplique) y revocatoria del consentimiento. Solicitudes a: vertercloud@gmail.com. Tiempo máximo de respuesta: 15 días hábiles conforme a la Ley 1581 de 2012. El titular podrá presentar queja ante la Superintendencia de Industria y Comercio (SIC) si considera vulnerados sus derechos. Las solicitudes deberán enviarse desde el correo registrado en la cuenta del Cliente para efectos de verificación de identidad.',
                },
                minors: {
                  title: '8. Menores',
                  content: 'Los servicios no están dirigidos a menores de edad.',
                },
                security: {
                  title: '9. Seguridad',
                  content: 'Se aplican medidas técnicas y organizativas razonables para proteger la información.',
                },
                incidents: {
                  title: '10. Notificación de Incidentes de Seguridad',
                  content: 'En caso de incidente que comprometa datos personales, se notificará conforme a la normativa aplicable.',
                },
              }
            },
            support: {
              mainTitle: 'Centro de Soporte',
              subtitle: '¿Cómo podemos ayudarte hoy?',
              categories: {
                technical: {
                  title: 'Soporte Técnico',
                  desc: 'Infraestructura, despliegue y problemas de API.',
                },
                billing: {
                  title: 'Facturación y Cuenta',
                  desc: 'Pagos, facturas y planes de suscripción.',
                },
                security: {
                  title: 'Seguridad y Cumplimiento',
                  desc: 'Reportes, certificaciones e incidentes de seguridad.',
                },
              },
              faq: {
                title: 'Preguntas Frecuentes',
                items: [
                  {
                    q: '¿Cómo despliego mi primer microservicio?',
                    a: 'Usa nuestra herramienta CLI o la consola para inicializar tu espacio de trabajo y desplegar en segundos.',
                  },
                  {
                    q: '¿Están mis datos cifrados?',
                    a: 'Sí, todos los datos en reposo y en tránsito están cifrados bajo estándares empresariales.',
                  },
                  {
                    q: '¿Cuáles son los horarios de soporte?',
                    a: 'Los clientes Enterprise cuentan con soporte prioritario 24/7. Los planes estándar tienen soporte 12/5.',
                  },
                ]
              },
              contact: {
                title: '¿Aún necesitas ayuda?',
                desc: 'Nuestro equipo está listo para asistirte.',
                button: 'Contactar Soporte',
              }
            }
          },
        },
      },
    },
  });

export default i18n;
