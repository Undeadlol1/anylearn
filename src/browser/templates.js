
// TODO: перечитать "пример и сравнить с шаблоном"

const desFirst = `<p>Первая стадия - это одновременно самый сложный и самый простой этап обучения. Самый сложный потому что на этом этапе ученик еще не знает чего он не знает. Что это за навык? Что он из себя представляет? Как он работает? Как его использовать? Как ему научиться? С чего начать? Все эти вопросы формируют огромную пропасть между учеником и предметом обучения. Именной из-за этого всегда так трудно начать обучаться чему-то новому. Приятный же момент в том, что на самом деле это самый простой этап для преодоления. Если попросить любого эспрета обьяснить простейшими словами в чем заключается его деятельность, то ему хватит буквально нескольких предложений. Потому что любой, даже самый сложный навык всегда можно разбить на ключевые моменты и обьяснить их простым языком.</p>`
const desSecond = `<p>Этот этап посвящен знакомству с путями обучения и поиску способов практического применения навыка.</p>
<p>Практика полученных знаний - самый важный этап обучения. Потому что теоретические знания, которые безусловно полезны, имеют свойство моментально забываться. К томуже, они осваиваются гораздо тяжелей, чем с практикой.</p>
<p>Если ученик не знает зачем обучаться какому-либо навыку, значит он ему и не нужен. Это концепция проста и эффективна, так как если в навык есть необходимость, ученики учиться с большей заинтересованностью, а учителям проще формулировать рекомендации, основанные на реальном применении, а не на расплывчатых теориях.</p>`
const desThird = `<p>Третий этап посвящен решению любых проблем и сложностей, возникающих при практике навыка. Именно здесь наиболее ценен опыт и знания людей, уже освоивших навык, так как они могут помочь ученику не изобретать велосипед, обьяснив как лучше всего заниматься этим навыком, какие секреты улучшат деятельность, и позволят не набивать шишки, познакомив ученика с подводными камнями.</p>`
const desFourth = `<p>На последнем этапе считается что ученик уже освоил навык и может его успешно применять. Теперь у него есть два варианта: перейти к другому навыку, или остаться и начать изучать продвинутые темы, связанные с текущим навыком. То есть те, которые не являются жизненно необходимы для тог чтобы успешно применять навык, но которые могут сделать из ученикам мастера.</p>`

const descriptions = [desFirst, desSecond, desThird, desFourth]

export const first =`
<p><i>Примечения сервиса лучше удалить после создания навыка. Если вы сформулируете навык правильно, то ученикам необязательно будет знать об этапах и их назначениях. Все будет итак очевидно.</i></p>
<p>Приведенные ниже пункты - это не высеченные в камне правила, а рекомендации, придерживаться которых, или нет, остается на ваше усмотрение. Вы можете менять местами пункты и/или убирать ненужные. Например, если у некого навыка нет каких-либо альтернатив, или у него нет предварительных условий, то соответствующие пункты можно смело опустить.</p>
${descriptions[0]}
<p><b>%Название навыка%</b> – это навык позволяющий...</p>
<p>Примеры использования навыка можно увидеть в ... или найти на ...</p>
<h2>Общая картина/контекст:</h2>

<b> Бывает, что для того чтобы не запутаться необходимо объяснить есть ли у этого навыка контекст или общая картина. Пожалуйста, не допускайте распространенной ошибки и не пишите длинных эссе о контексте навыка и, уж точно, о его истории. Пишите коротко и строго по делу. Только то, что нужно для понимания навыка и его общей картины.</b>
<b>Необходимость объяснения контекста зависит от конкретного навыка. Иногда это обязательно, иногда – совсем не нужно</b>

<h2>Альтернативы</h2>
<b>
<p>Необходимо понимать, что описываемый вами навык может не отвечать необходимости потенциального читателя. Если вы укажите альтернативы, которые могут ответить на его потенциальные вопросы, и лучше удовлетворить его нужды, то вы сэкономите себе и другим кучу времени.</p>
<p>Старайтесь быть обьективными, не стоит заманивать людей в свой навык. Это пойдет только во вред сообществу.</p>
<p>Количество людей, которые учатся вашему, совсем не означает качество сообщества, формирующегося вокруг него.</p>
</b>
<p>В этой статье рассматривается %%название навыка%%. Если этот навык не способен ответить на ваши вопросы или не удовлетворяет ваши нужды, то попробуйте обратиться к … Или найти ответы в этих статьях:</p>
<ul>
  <li>Статья один</li>
  <li>Статья два</li>
</ul>
<p>Или используйте эти навыки:</p>
<ul>
  <li>Навык один</li>
  <li>Навык два</li>
</ul>

<h2>Основы навыка:</h2>

<b><p>Здесь необходимо краткое изложение основных фундаментальных понятий, на которых будет базироваться все дальнейшее обучение. Это и есть то самое «преодоление преграды между учеником и предметом».</p>
<p>Допустимо, и во многих случаях даже привествуется, упрощение. Даже во вред точности и/или информативности.</p>
<p>Крайне важна простота объяснения. Если вы не можете объяснить это, словно объясняете десятилетнему ребенку, значит вы сами не понимаете навык. </b>
<p>Этот навык состоит из: …</p>
`
export const second = `<b><i>Примечание сервиса:</i></b>
${descriptions[1]}
<h2>Основные идеи применения:</h2>

<b> Очень важно дать ученику правильные идеи применения навыка. При этом стоит помнить о том, что идеи должны быть: а) реалистичны(не нужно обещать им того, что они не смогут сделать, или сделают неоправданно большим усилием), б) интересны(чем интереснее цель, тем проще обучаться), в) практичны(цели, которые не имеют ценности плохо влияют на обучение) </b>
<ul>
  <li>Скопировать что-то</li>
  <li>Изменить что-то существующее</li>
  <li>Реализовать некую идею</li>
</ul>
<p>Примечание для учеников - если вы не можете найти применение этому навыку, значит он вам не нужен. Займитесь чем-либо еще.</p>

<h2>Способы обучения</h2>

<p><b>Способов обучения может быть один или несколько.</b></p>
<p><b>Способы обучения подбираются на основе потенциальной картины ученика, наличии материалов для обучения и особенностей навыка.</b></p>
<ul>
  <li>Для мальчиков</li>
  <li>Для девочек</li>
  <li>По-русски</li>
  <li>По-английски</li>
  <li>Платно</li>
  <li>Бесплатно</li>
</ul>

<h3>Первый способ обучения</h3>
<p>В данном сегменте следует ответить на следующие вопросы:</p>
<li>Какие ресурсы изучать</li>
<li>Как лучше всего это делать</li>
<li>Что знать обязательно, а что - нет</li>
`
export const third = `<b>Примечание сервиса:</b>
${descriptions[2]}
<p>Берите задачу, которую выбрали на прошлом этапе, и воплощайте ее с помощью приведенной ниже информации. Не пытайтесь зубрить эти материалы, а ищите и используйте информацию по мере необходимости.</p>
<h2>Ресурсы</h2>
<ul>
  <li>Найти ответ можно в …</li>
  <li>Задать вопрос можно на …</li>
  <li>http://www.google.com – твой лучший друг</li>
</ul>

<h2>Инструменты</h2>

<h2>Лучшие практики</h2>

<p><b>Последние наставления, важные моменты и лучшие практики необходимы, для того чтобы спасти ученика от множества подводных камней и облегчить ему жизнь. Все что способно подпортить нервы ученику необходимо упомянуть и указать решение</b></p>
<p><b>Также, неплохо было бы рассказать о том, что может упростить практику</b></p>

<h2>Сложные моменты</h2>

<p><b>Если что-то при обучении вам давалось с трудом, или было потрачено слишком много усилий – расскажите об этом.</b></p>
<p><b>Это секция, где сложные моменты обьясняются простым языком.</b></p>
`
export const fourth =`<b>Примечание сервиса:</b>
${descriptions[3]}
<p>Возвращайтесь к этому этапу каждый раз, когда захотите повысить свое мастерство.</p>

<h2>Идеальный рабочий процесс</h2>


<b> Об отличиях практиканта от мастера необходимо рассказать здесь. И поделиться информацией, помогающей перейти от одного состояния к другому  </b>

<h2>Дальнейшие пути развития</h2>


<b> Необходимо подобрать навыки, которые будут интересны после освоения навыка обсуждаемой статьи </b>
<ul>
  <li>Первая ссылка на другой навык</li>
  <li>Вторая ссылка на другой навык</li>
  <li>Третья ссылка на другой навык</li>
</ul>`

  export const skill = [first, second, third, fourth]
  export const introduction = `
  <p>Мы верим что все является навыком, и что каждому навыку можно учить хорошо. Потому создаем сервис таким, чтобы все усилия были направлены на помощь ученику в освоении навыка.</p>

<p>Понять как это реализовывается на практике, можно взглянув на шаблон создания навыка(представлен далее) или в любом из устоявшихся навыков.</p>

<p>Обратите внимание, что вы не найдете здесь сухого пересказывания информации,&nbsp;или бессвязные списки/рекомендации по обучению. Вместо этого, вы обнаружите, что множество людей собрались вместе, и написали для вас лучшее руководство по обучению. Они сформулировали, обработали и разжевали ответы о том, что вы должны делать,&nbsp;зачем&nbsp;и как. Какие трудности вас ожидают и как их преодолеть. Вам больше никогда не придется изобретать велосипед и набивать шишки. Все уже сделано за вас и для вас.</p>
<h3>Особенности презентации навыков</h3>
<p>Каждый навык представлен ввиде четырех ступеней, которые соответствуют четырем ступеням обучения:</p>
<ul>
  <li><h4>Новичок</h4></li>
  ${descriptions[0]}
  <li><h4>Ученик</h4></li>
  ${descriptions[1]}
  <li><h4>Практикант</h4></li>
  ${descriptions[2]}
  <li><h4>Мастер</h4></li>
  ${descriptions[3]}
</ul>
`
