# ChatPGS

The project is live at: https://jeyabbalas.github.io/chat-pgs/

_Reliability_ is an important unsolved problem in large language models such as ChatGPT. _Reliability_ is defined as the ability to generate a response that is consistent with the context. In the context of information retrieval, reliability is the ability to generate a response that is consistent with the query. Large language models famously hallucinate. This project explores one way to overcome this and improve reliability of ChatGPT for a specific application.

Specifically, this project explores retrieval augmentation for the task of information retrieval from genome-wide association studies literature. To demo this, the paper [(Mavaddat et al., 2019)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6323553/) is used as an example.

The implemented method takes the paper, splits it into paragraphs, and encodes each paragraph into an embedding vector using OpenAI's [`text-embedding-ada-002`](https://platform.openai.com/docs/guides/embeddings/what-are-embeddings) model. The user's query is also mapped to this embedding space. Then the first nearest neighbor is retrieved and augmented to the user's query. ChatGPT now has access to the augmented query to generate a more reliable response.