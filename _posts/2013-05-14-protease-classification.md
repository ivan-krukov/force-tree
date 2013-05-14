---
layout: post
title: "Protease Classification"
description: ""
category: notes 
tags: [proteases, databases, classification]
---
{% include JB/setup %}
  [MEROPS]: http://www.merops.sanger.ac.uk/
  [1]: http://nar.oxfordjournals.org/content/40/D1/D343.full-text-lowres.pdf
  [2]: http://merops.sanger.ac.uk/about/classification.shtml

I wanted to understand proteases and their classification a little bit better. The [MEROPS] database classifies most of the knowledge we currently have on the subject. The database is manually curated, and their papers offer a rather sparing description of computational methods. The most recent publication is [here][1]. A bulk of database and classification description transcribed from [here][2].

MEROPS is a manually curated database that classifies proteases on three criteria:

* The chemical mechanism of catalysis

* Details of the catalyzed reaction

* Molecular structure and homology

The first classification criterion specifies the activity of the protease. The respective chemical moiety (or its modification) acts as a nucleophile at the center of the catalytic site. However, the classification is not definitive _i.e._ different structures and catalytic mechanisms exist within each group. There are the following types:

<table class="table table-striped table-bordered">
<thead>
	<th>Type</th>
	<th>MEROPS letter</th>
</thead>
<tbody>
	<tr>
		<td>Serine</td>
		<td>S</td>
	</tr><tr>
		<td>Cysteine</td>
		<td>C</td>
	</tr><tr>
		<td>Threonine</td>
		<td>T</td>
	</tr><tr>
		<td>Aspartic</td>
		<td>A</td>
	</tr><tr>
		<td>Glutamic</td>
		<td>G</td>
	</tr><tr>
		<td>Asparagine</td>
		<td>N</td>
	</tr><tr>
		<td>Metallo catalytic</td>
		<td>M</td>
	</tr><tr>
		<td>Unknown</td>
		<td>U</td>
	</tr><tr>
		<td>Mixed</td>
		<td>P</td>
	</tr>
</tbody>
</table>

The above groups represent the topmost level of classification in MEROPS (and the first letter of the ID).

The second classification is based on the reaction that the peptidase catalyses (which in a sense is always the hydrolysis of a peptide bond). The following groups exist:

  [S01.001]: http://merops.sanger.ac.uk/cgi-bin/pepsum?id=S01.001

Each protease group is called a <i>species</i> in MEROPS. They are grouped into families, and families are grouped in clans. The ID for each protein is of the form [S01.001], where __S__ is the mechanistic classification with the associated subgroup. The three digits that follow identify the particular protein. There is an implication of similar function between members of the same species. It is also expected that the species variants of the members of a MEROPS species will be consistent with biological species tree.

Families are constructed on the basis of sequence comparison. The most important aspect is to have statistically high similarity to at least one __peptidase unit__ for some member of the given family. The peptidase unit is defined as the section that is most directly responsible for catalytic activity. It is arguably the most important definition that MEROPS makes. Thus, any downstream analyses should rely heavily on this definition. Some families may be further split into subfamilies. Notice that family assignment implies the broadest possible homology assignment _i.e._ clans are not homologous. Tools used for homology assignment (into families) include BLASTP, HMMER and FastA. The authors mention that only statistically significant hits (expectation value &lt; 0.001) are accepted into homolog groups.

  [DALI]: http://www.ncbi.nlm.nih.gov/pubmed/8578593

Clans represent possible large homology groups that cannot be conclusively established on the sequence level, but there exists a strong reason to believe that those sequences share common ancestry. These are commonly assigned on the basis of three-dimensional structure similarity. [DALI] is used for structure assessment.
