// dependencies
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { PureComponent } from 'react'
import { Grid, Row, Col } from 'react-styled-flexboxgrid'
// project files
import PageWrapper from 'browser/components/PageWrapper'
import { translate as t } from 'browser/containers/Translator'

const text = `						AnyLearn – это библиотека навыков, созданная открытым сообществом. Каждый может делиться знаниями. Любой может вносить изменения.
У проекта есть два основных постулата:
# Все есть навык
# Всякому навыку можно обучиться
Примечание: лучше всего читать эту статью одновременно сравнивая ее с одной из «избранных статей» (будут добавлены позже). Наглядный пример – лучшее объяснение.
== Зачем участвовать? ==
Теория шести рукопожатий гласит, что до любого человека можно найти, пройдя цепь не более чем в шесть человек. Тоже самое обстоит с информацией. Если ты внесешь свою лепту, и поделишься знаниями о чем-либо, то существует крайне большая вероятность того, что в этот момент кто-то создает материалы которые тебе необходимы и интересны. Такое взаимодействие и лежит в основе успешности портала. Помогая другим ты помогаешь себе.
== Четыре этапа обучения ==
Для того чтобы упростить обучение каждая статья резделена на четыре этапа в соответствии с четырьмя этапами обучения. Это обусловлено следующими факторами:
* У каждого навыка появляется знакомая и простая структура, позволяющая обучаться с бОльшей простотой.
* У каждого этапа свои проблемы. Разделение позволяет охватить и решить их все
* У каждого человека навыки находятся на разном этапе. Например, кто-то уже знаком с навыком но не умеет его применять, кто-то незнаком вовсе. Разделение позволяет начать с того этапа, который тебе наиболее подходит, не тратя времени впустую
=== Правила написания ===
Для наилучшего обучения, необходимо писать статьи в соответствии со следующими правилами:
Все ресурсы этого портала нацелены на конечного пользователя, то есть на человека пришедшего чему-либо научиться, поэтому худшее что мы можем сделать – вывалить на неподготовленного кучу непонятных ему терминов, сложных образов или множество информации, которое он не способен переработать. Поэтому это наша задача, как учителей, понимать кто является нашим читателем, зачем ему необходим тот или иной навык, и как лучше всего его этому навыку обучить.
И еще раз. Важны:
* Доступность и простота предоставляемого материала
Как рассказать проще всего? Как избежать недопонимания?
* Нацеленность на обучение
Не описывайте навык, а расскажите как обучиться. Разница существенна.
* Понимание целей читателя
Учителя очень часто забывают себе задавать простейшие вопросы: Зачем человек хочет научиться этому навыку? Что ему нужно?
=== Название навыка ===
Итак, давайте перейдем непосредственно к написанию статей. Во-первых, писать статьи стоит лишь убедившись что такой статьи (или аналогичной) нет в поиске. Во-вторых, создавая название навыка, пожалуйста берите в расчет, что люди могут искать навык по нескольким ключевым словам. Сверху пишется правильное название, ниже – альтернативные. Это могут быть бытовые название, сленговые, устоявшиеся нормы, и прочее. Наша задача – удостовериться что человек может найти нужную ему статью, даже если не знает правильного названия навыка.
== Новичок ==
Первый этап подразумевает под собой стадию когда человек еще не знает чего он не знает. То есть, у него есть лишь намерение обучиться, но никаких познаний о том, из чего состоит навык и как ему обучиться.
Поэтому, задача первого этапа - разбить преграду между учеником и предметом, познакомив его с изучаемыми материалами и основными моментами навыка.
=== Понятие ===
Перво-наперво необходимо дать понять ученику что есть этот навык. Сделать это необходимо простым языком, желательно на понятном и привычном примере, не оставляющем места для сомнений. Любое, даже самое сложное техническое понятие, можно объяснить простыми словами. Проект не поддерживает ложные представления о избранности того или иного навыка.
Пример по необходимости.
=== Общая картина/контекст ===
Бывает, что для того чтобы не запутаться необходимо объяснить есть ли у этого навыка контекст или общая картина. В нашем примере, это необходимо, потому что ученики могут прийти чтобы научиться делать сайты, но они могут не найти нужную им информацию, потому что есть несколько специальностей, которые отвечают за создание сайтов.
Пожалуйста, не допускайте распространенной ошибки и не пишите длинных эссе о контексте навыка и, уж точно, о его истории. Пишите коротко и строго по делу. Только то, что нужно для понимания навыка.
=== Альтернативы ===
Необходимо понимать, что описываемый вами навык может не отвечать необходимости потенциального читателя. Если вы укажите альтернативы, которые могут ответить на его потенциальные вопросы, и лучше удовлетворить его нужды, то вы сэкономите себе и другим кучу времени. В этом нет ничего плохого.

=== Основы навыка ===
Затем необходимо познакомить ученика с основами навыка. То есть с кратким изложением основных фундаментальных понятий, на которых будет базироваться все дальнейшее обучение. Это и есть то самое «преодоление преграды между учеником и предметом».
== Ученик ==
Второй этап – это состояние когда ученик знает чего он не знает. То есть он знаком с основными моментами и это дает ему понятие о том, что необходимо изучить. Но он не знает как это сделать. Более того, для того чтобы обучиться какому-либо навыку необходимо понять где этот навык можно применить. Это один из фундаментальных вопросов этого сообщества. Эффективность нашего обучения мы создаем заставляя людей понимать необходимость обучения. Мы знаем что люди, обучающиеся чему-либо без конкретной необходимости в применении, тратят свое время зря. Обучение будет происходить с трудом и они мгновенно забудут все чему учились. И маловероятно что вообще научатся.
=== Идеи применения ===
Именно наша задача как учителей, и как коллективного интеллекта дать идеи применения ученикам. Потому что обучаться итак трудно, а придумать причину для обучения – тем более.
Ссылка на альтернативы
И, опять таки, если ученик не может понять зачем ему обучаться этому навыку, если не может, или не видит смысла, в применении, то следует напомнить ему, что существуют альтернативы, которые могут его заинтересовать. Как ни странно, чем меньше людей читают вашу статью, тем лучше. Если все они – заинтересованы в излагаемом материале, и способны оценить его практическую пользу.
=== Способы обучения ===
Наконец мы подходим к одному из самых полезных моментов сайта. Это самый сок ресурса.
Способы обучения – гайды, созданные с помощью коллективного интеллекта, и впитавшие в себя лучшее, что только может найти человек.
Плюс, способов обучения можно (и, зачастую, нужно) делать множество. Идеи для этого можно почерпнуть из картины потенциального ученика. В нашем примере у ученика могут быть средства для обучения или он может может не иметь и гроша. Он может знать английский язык или предпочитать материалы на русском.
Хочу обратить ваше внимание, что помимо потенциальной картины ученика, мы в-первую очередь смотрим на особенности и уникальные черты навыка. В нашем примере особенностями является то, что 90% материалов по обучению – на английском, и знание его является стандартом, поэтому ему отделен отдельный информационный блок, более того, он выбран основным. Это нестандартный ход. Вторая особенность – у данного навыка есть нескончаемое множество бесплатных материалов, ввиду его контекста (многие сайты делятся знаниями о том как строить сайты). Эти материалы бывают лучше платных. Опять таки, особенность навыка, и необязательно в статье о другом навыке будет что-либо хоть отдаленно похожее.

== Практикант ==
Лучший способ обучения – путем решения проблем. Поэтому задача третьего этапа - дать инструменты для самостоятельного освоения навыка. Здесь приведены ресурсы для поиска ответов, лучшие практики и разбор особо трудных моментов.
Это второй из лучших особенностей данного портала. Вместо того, чтобы тратить сотни часов, набивать десятки шишек, сообщество делится своим опытом, упрощая жизнь ученику.
=== Ресурсы и инструменты ===
Здесь собраны ресурсы для самостоятельного поиска ответов. Комментарии и пояснения обязательны.
=== Лучшие практики ===
Последние наставления, важные моменты и лучшие практики необходимы, как уже было сказано ранее, для того чтобы спасти ученика от множества подводных камней и облегчить ему жизнь.
=== Трудные моменты ===
Все что способно подпортить нервы ученику необходимо упомянуть и указать решение

== Четвертый этап ==
К этому моменту ученик считается освоившим навык. Теперь он может либо отшлифовать свои навыки, чтобы повысить свое мастерство, либо выбрать дальнейшие пути развития.
=== Идеальный воркфлоу ===
Здесь описываются идеи того, что отличает мастера от практиканта, и как этому обучиться.
=== Дальнейшие пути развития ===
В конце концов, любое обучение подходит к концу, и мы можем лишь посоветовать чему неплохо было бы учиться дальше.`

class AboutPage extends PureComponent {
    render() {
		const { props } = this
		return 	<PageWrapper className='AboutPage'>
					<Row className="AboutPage__header">
						<Col xs={12}>
							<h1 className="AboutPage__title">{t('about_us')}</h1>
							<section>
								<p><b>AnyLearn</b> – это библиотека навыков, созданная открытым сообществом. Каждый может делиться знаниями. Любой может вносить изменения.</p>
								<p>У проекта есть два основных постулата:</p>
								<ul>
									<li>Все есть навык</li>
									<li>Всякому навыку можно обучиться</li>
								</ul>
								<p>Примечание: лучше всего читать эту статью одновременно сравнивая ее с одной из «избранных статей» (будут добавлены позже). Наглядный пример – лучшее объяснение.</p>
								<h2>Зачем участвовать?</h2>
								Теория шести рукопожатий гласит, что до любого человека можно найти, пройдя цепь не более чем в шесть человек. Тоже самое обстоит с информацией. Если ты внесешь свою лепту, и поделишься знаниями о чем-либо, то существует крайне большая вероятность того, что в этот момент кто-то создает материалы которые тебе необходимы и интересны. Такое взаимодействие и лежит в основе успешности портала. Помогая другим ты помогаешь себе.
								<h2>Четыре этапа обучения</h2>
								<p>Для того чтобы упростить обучение каждая статья резделена на четыре этапа в соответствии с четырьмя этапами обучения. Это обусловлено следующими факторами:</p>
								<ul>
									<li>У каждого навыка появляется знакомая и простая структура, позволяющая обучаться с бОльшей простотой.</li>
									<li>У каждого этапа свои проблемы. Разделение позволяет охватить и решить их все</li>
									<li>У каждого человека навыки находятся на разном этапе. Например, кто-то уже знаком с навыком но не умеет его применять, кто-то незнаком вовсе. Разделение позволяет начать с того этапа, который тебе наиболее подходит, не тратя времени впустую</li>
								</ul>
								<h3>Правила написания</h3>
								<p>Для наилучшего обучения, необходимо писать статьи в соответствии со следующими правилами:</p>
								<p>Все ресурсы этого портала нацелены на конечного пользователя, то есть на человека пришедшего чему-либо научиться, поэтому худшее что мы можем сделать – вывалить на неподготовленного кучу непонятных ему терминов, сложных образов или множество информации, которое он не способен переработать. Поэтому это наша задача, как учителей, понимать кто является нашим читателем, зачем ему необходим тот или иной навык, и как лучше всего его этому навыку обучить.</p>
								<p>И еще раз. Важны:</p>
								* Доступность и простота предоставляемого материала
								Как рассказать проще всего? Как избежать недопонимания?
								* Нацеленность на обучение
								Не описывайте навык, а расскажите как обучиться. Разница существенна.
								* Понимание целей читателя
								Учителя очень часто забывают себе задавать простейшие вопросы: Зачем человек хочет научиться этому навыку? Что ему нужно?


								{/* === Название навыка ===
								Итак, давайте перейдем непосредственно к написанию статей. Во-первых, писать статьи стоит лишь убедившись что такой статьи (или аналогичной) нет в поиске. Во-вторых, создавая название навыка, пожалуйста берите в расчет, что люди могут искать навык по нескольким ключевым словам. Сверху пишется правильное название, ниже – альтернативные. Это могут быть бытовые название, сленговые, устоявшиеся нормы, и прочее. Наша задача – удостовериться что человек может найти нужную ему статью, даже если не знает правильного названия навыка.
								== Новичок ==
								Первый этап подразумевает под собой стадию когда человек еще не знает чего он не знает. То есть, у него есть лишь намерение обучиться, но никаких познаний о том, из чего состоит навык и как ему обучиться.
								Поэтому, задача первого этапа - разбить преграду между учеником и предметом, познакомив его с изучаемыми материалами и основными моментами навыка.
								=== Понятие ===
								Перво-наперво необходимо дать понять ученику что есть этот навык. Сделать это необходимо простым языком, желательно на понятном и привычном примере, не оставляющем места для сомнений. Любое, даже самое сложное техническое понятие, можно объяснить простыми словами. Проект не поддерживает ложные представления о избранности того или иного навыка.
								Пример по необходимости.
								=== Общая картина/контекст ===
								Бывает, что для того чтобы не запутаться необходимо объяснить есть ли у этого навыка контекст или общая картина. В нашем примере, это необходимо, потому что ученики могут прийти чтобы научиться делать сайты, но они могут не найти нужную им информацию, потому что есть несколько специальностей, которые отвечают за создание сайтов.
								Пожалуйста, не допускайте распространенной ошибки и не пишите длинных эссе о контексте навыка и, уж точно, о его истории. Пишите коротко и строго по делу. Только то, что нужно для понимания навыка.
								=== Альтернативы ===
								Необходимо понимать, что описываемый вами навык может не отвечать необходимости потенциального читателя. Если вы укажите альтернативы, которые могут ответить на его потенциальные вопросы, и лучше удовлетворить его нужды, то вы сэкономите себе и другим кучу времени. В этом нет ничего плохого.

								=== Основы навыка ===
								Затем необходимо познакомить ученика с основами навыка. То есть с кратким изложением основных фундаментальных понятий, на которых будет базироваться все дальнейшее обучение. Это и есть то самое «преодоление преграды между учеником и предметом».
								== Ученик ==
								Второй этап – это состояние когда ученик знает чего он не знает. То есть он знаком с основными моментами и это дает ему понятие о том, что необходимо изучить. Но он не знает как это сделать. Более того, для того чтобы обучиться какому-либо навыку необходимо понять где этот навык можно применить. Это один из фундаментальных вопросов этого сообщества. Эффективность нашего обучения мы создаем заставляя людей понимать необходимость обучения. Мы знаем что люди, обучающиеся чему-либо без конкретной необходимости в применении, тратят свое время зря. Обучение будет происходить с трудом и они мгновенно забудут все чему учились. И маловероятно что вообще научатся.
								=== Идеи применения ===
								Именно наша задача как учителей, и как коллективного интеллекта дать идеи применения ученикам. Потому что обучаться итак трудно, а придумать причину для обучения – тем более.
								Ссылка на альтернативы
								И, опять таки, если ученик не может понять зачем ему обучаться этому навыку, если не может, или не видит смысла, в применении, то следует напомнить ему, что существуют альтернативы, которые могут его заинтересовать. Как ни странно, чем меньше людей читают вашу статью, тем лучше. Если все они – заинтересованы в излагаемом материале, и способны оценить его практическую пользу.
								=== Способы обучения ===
								Наконец мы подходим к одному из самых полезных моментов сайта. Это самый сок ресурса.
								Способы обучения – гайды, созданные с помощью коллективного интеллекта, и впитавшие в себя лучшее, что только может найти человек.
								Плюс, способов обучения можно (и, зачастую, нужно) делать множество. Идеи для этого можно почерпнуть из картины потенциального ученика. В нашем примере у ученика могут быть средства для обучения или он может может не иметь и гроша. Он может знать английский язык или предпочитать материалы на русском.
								Хочу обратить ваше внимание, что помимо потенциальной картины ученика, мы в-первую очередь смотрим на особенности и уникальные черты навыка. В нашем примере особенностями является то, что 90% материалов по обучению – на английском, и знание его является стандартом, поэтому ему отделен отдельный информационный блок, более того, он выбран основным. Это нестандартный ход. Вторая особенность – у данного навыка есть нескончаемое множество бесплатных материалов, ввиду его контекста (многие сайты делятся знаниями о том как строить сайты). Эти материалы бывают лучше платных. Опять таки, особенность навыка, и необязательно в статье о другом навыке будет что-либо хоть отдаленно похожее.

								== Практикант ==
								Лучший способ обучения – путем решения проблем. Поэтому задача третьего этапа - дать инструменты для самостоятельного освоения навыка. Здесь приведены ресурсы для поиска ответов, лучшие практики и разбор особо трудных моментов.
								Это второй из лучших особенностей данного портала. Вместо того, чтобы тратить сотни часов, набивать десятки шишек, сообщество делится своим опытом, упрощая жизнь ученику.
								=== Ресурсы и инструменты ===
								Здесь собраны ресурсы для самостоятельного поиска ответов. Комментарии и пояснения обязательны.
								=== Лучшие практики ===
								Последние наставления, важные моменты и лучшие практики необходимы, как уже было сказано ранее, для того чтобы спасти ученика от множества подводных камней и облегчить ему жизнь.
								=== Трудные моменты ===
								Все что способно подпортить нервы ученику необходимо упомянуть и указать решение

								== Четвертый этап ==
								К этому моменту ученик считается освоившим навык. Теперь он может либо отшлифовать свои навыки, чтобы повысить свое мастерство, либо выбрать дальнейшие пути развития.
								=== Идеальный воркфлоу ===
								Здесь описываются идеи того, что отличает мастера от практиканта, и как этому обучиться.
								=== Дальнейшие пути развития ===
								В конце концов, любое обучение подходит к концу, и мы можем лишь посоветовать чему неплохо было бы учиться дальше. */}
							</section>
						</Col>
					</Row>
				</PageWrapper>
    }
}

AboutPage.propTypes = {
	// name: PropTypes.string.isRequired,
}

export { AboutPage }

export default
connect(
	(state, ownProps) => ({
		...ownProps,
		// name: state.forum.get('name'),
	}),
)(AboutPage)